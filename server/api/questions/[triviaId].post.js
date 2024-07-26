import { createOpenAI } from '@ai-sdk/openai'
import prisma from "~/lib/prisma"

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

import { generateText } from 'ai'

const getPrompt = ({ topic, difficulty, description }) => {
  return `
  
El tema es "${topic}" y la dificultad = "${difficulty}". Usa emojis relacionados al tema. El emoji no debe revelar la cual es la respuesta correcta, debe ser solo decorativo. Solo una respuesta correcta. Responde solo en formato json
Dame pregutnas 5 preguntas para una trivia en json con el siguente formato:
[
  {
    "question": "question?",
    "emoji": "🚒",
    "answers": [
      {
        "answer": "text 1",
        "isCorrect": false,
        "emoji": "😎"
      },
      {
        "answer": "text 2",
        "isCorrect": false,
        "emoji": "🥰"
      },
      {
        "answer": "text 3",
        "isCorrect": true,
        "emoji": "😗"
      },
      {
        "answer": "text 4",
        "isCorrect": false,
        "emoji": "🐴"
      }
    ],
    "wrongMessage": "message",
    "correctMessage": "message",
    "explanation": "explanation and example"
  },
  + 4 preguntas más
]

`
}

const createQuestions = async ({ triviaId, topic, difficulty, description }) => {
  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: getPrompt({ topic, difficulty, description }),
  })


  const cleanJson = text.replaceAll('```', '').replaceAll('json', '')
  console.log('text', cleanJson)
  const questions = JSON.parse(cleanJson)

  const questionsResult = []
  for (const question of questions) {
    const { answers, ...questionData } = question
    const questionInstance = await prisma.question.create({
      data: {
        ...questionData,
        triviaId,
      },
    })

    for (const answer of answers) {
      const instance = await prisma.answer.create({
        data: {
          ...answer,
          questionId: questionInstance.id,
        },
      })
      questionsResult.push({ ...questionData, answers: [...answers, instance] })
    }
  }
  return questionsResult
}

export default defineEventHandler(async (event) => {
  const { triviaId } = event.context.params

  const trivia = await prisma.trivia.findUnique({
    where: {
      id: triviaId,
    },
  })

  const { topic, difficulty, data, description } = trivia

  const questions = await createQuestions({ triviaId, topic, difficulty, description })

  return questions
})

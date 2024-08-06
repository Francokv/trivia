import { createOpenAI } from '@ai-sdk/openai'
import prisma from "~/lib/prisma"

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

import { generateText } from 'ai'

const getPrompt = ({ topic, difficulty, description, quantity=10 }) => {
  return `
El tema es "${topic}" y la dificultad = "${difficulty}". Usa emojis relacionados al tema. El emoji no debe revelar la cual es la respuesta correcta, debe ser solo decorativo. Solo una respuesta correcta. Responde solo en formato json
Dame pregutnas ${quantity} preguntas para una trivia en json con el siguente formato:
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
    "htmlExplanation": "explanation <b> important data </b>  <br/><br/> example if needed"
  },
  + ${quantity-1} preguntas más
]

`
}

const createQuestions = async ({ triviaId, topic, difficulty, description, quantity=10 }) => {
  const prompt = getPrompt({ topic, difficulty, description, quantity })
  console.log('prompt', prompt)
  const { text } = await generateText({
    model: openai('gpt-4o'),
    prompt: prompt,
  })


  const cleanJson = text.replaceAll('```json', '').replaceAll('```', '')
  const questions = JSON.parse(cleanJson)

  const questionsResult = []
  for (const question of questions) {

    const { answers, htmlExplanation, ...questionData } = question
    console.log('questionData', questionData)
    const questionInstance = await prisma.question.create({
      data: {
        ...questionData,
        explanation: htmlExplanation,
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

  if (trivia.isPublished) {
    return {
      statusCode: 400,
      body: {
        message: 'Trivia is already published',
      },
    }
  }


  const { title: topic, difficulty, data, description } = trivia

  const questionsPromices = Promise.all([
    await createQuestions({ triviaId, topic, difficulty, description, quantity:10 }),
  ])

  await questionsPromices

  trivia.isPublished = true
  await prisma.trivia.update({
    where: {
      id: triviaId,
    },
    data: {
      isPublished: true,
    },
  })

  return {
    statusCode: 200,
    body: {
      message: 'Questions created',
    },
  }
})

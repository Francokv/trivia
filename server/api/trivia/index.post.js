import { createOpenAI } from '@ai-sdk/openai';
import categories from '../../constants/categories.json';
import prisma from "~/lib/prisma";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import { generateText } from 'ai';


const getCreateTrivaPrompt = ({topic, difficulty}) => {
  return `Estoy creando un trivia de "${topic}" y dificulatad "${difficulty}". Necesito un nombre, descripción y categoria. La categoria debe ser una de las siguentes: ${categories.join(', ')}. Responde con el siguiente formato:
  {
    "title": "Nombre de la trivia",
    "description": "Descripción de la trivia",
    "category": "Categoría",
    "curiosities": ["Sabías que ...", "curiosidad 2", "curiosidad 3", "curiosidad 4", "curiosidad 5"]
  }
  `
}
const getPrompt = ({topic, difficulty, description}) => {
  return`Dame pregutnas 5 preguntas para una trivia en json con el siguente formato:
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


el tema es "${topic}" y la dificultad = "${difficulty}". Usa emojis relacionados al tema. El emoji no debe revelar la cual es la respuesta correcta, debe ser solo decorativo. Solo una respuesta correcta. Responde solo con el json`
}



const createQuestions = async ({triviaId, topic, difficulty, description}) => {
  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: getPrompt({topic, difficulty, description}),
  });


  console.log('text', text)
  const questions = JSON.parse(text)

  for (const question of questions) {
    const { answers, ...questionData } = question
    const questionInstance = await prisma.question.create({
      data: {
        ...questionData,
        triviaId,
      },
    })

    for (const answer of answers) {
      await prisma.answer.create({
        data: {
          ...answer,
          questionId: questionInstance.id,
        },
      })
    }
  }
}

export default defineEventHandler(async (event) => {
  const { topic, difficulty } =  await readBody(event)

  const createTriviaPrompt = getCreateTrivaPrompt({topic, difficulty})
  console.log('createTriviaPrompt', createTriviaPrompt)

  const { text: trivia } = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: createTriviaPrompt,
  });

  
  const data = JSON.parse(trivia)

  const triviaInstance = await prisma.trivia.create({
    data: {
      ...data,
      difficulty,
    },
  })

  console.log('triviaInstance', triviaInstance)

  return {
    statusCode: 200,
    body: triviaInstance,
  }
})

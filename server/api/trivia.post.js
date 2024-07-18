import { createOpenAI } from '@ai-sdk/openai';
import categories from '../constants/categories.json';
import prisma from "~/lib/prisma";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import { generateText } from 'ai';


const getCreateTrivaPrompt = (topic, difficulty) => {
  return `Estoy creando un trivia de "${topic}" y dificulatad "${difficulty}". Necesito un nombre, descripción y categoria. La categoria debe ser una de las siguentes: ${categories.join(', ')}. Responde con el siguiente formato:
  {
    "title": "Nombre de la trivia",
    "description": "Descripción de la trivia",
    "category": "Categoría"
  }
  `
}
const getPrompt = (topic, difficulty, description) => {
  return`Dame pregutnas 5 preguntas para una trivia en json con el siguente formato:
{
  "triviaName": "Trivia name",
  "triviaLargeDescription": "Trivia description",
  "questions": [
    {
      "question": "question?",
      "questionEmoji": "🚒",
      "options": [
        {
          "text": "text 1",
          "value": "value 1",
          "emoji": "😎"
        },
        {
          "text": "text 2",
          "value": "value 2",
          "emoji": "🥰"
        },
        {
          "text": "text 3",
          "value": "value 3",
          "emoji": "😗"
        },
        {
          "text": "text 4",
          "value": "value 4",
          "emoji": "🐴"
        }
      ],
      "correctValue": "value 3",
      "incorrectMessage": "message",
      "correctMessage": "message",
      "explanationAndExample": "explanation and example"
    },
    + 4 preguntas más
  ]
}

el tema es "${topic}" y la dificultad = "${difficulty}". Usa emojis relacionados al tema. Responde solo con el json`
}

const createQuestions = async () => {
  
}

export default defineEventHandler(async (event) => {
  const { topic, difficulty } =  await readBody(event)

  const createTriviaPrompt = getCreateTrivaPrompt(topic, difficulty)
  console.log('createTriviaPrompt', createTriviaPrompt)

  const { text: trivia } = await generateText({
    model: openai('gpt-3.5-turbo'),
    prompt: createTriviaPrompt,
  });

  
  console.log('trivia', trivia)
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

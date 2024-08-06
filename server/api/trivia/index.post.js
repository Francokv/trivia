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
    "title": "Un título creativo como",
    "description": "Descripción un corta y concisa",
    "category": "Categoría",
    "curiosities": ["Sabías que ...", "curiosidad 2", "curiosidad 3", "curiosidad 4", "curiosidad 5"]
  }
  `
}

export default defineEventHandler(async (event) => {
  const { topic, difficulty } =  await readBody(event)

  const createTriviaPrompt = getCreateTrivaPrompt({topic, difficulty})
  console.log('createTriviaPrompt', createTriviaPrompt)

  let { text: trivia } = await generateText({
    model: openai('gpt-4o'),
    prompt: createTriviaPrompt,
  });

  trivia = trivia.replaceAll('```json', '').replaceAll('```', '')
  console.log('trivia', trivia)

  const data = JSON.parse(trivia)

  const triviaInstance = await prisma.trivia.create({
    data: {
      ...data,
      rawTopic: topic,
      difficulty,
    },
  })

  return {
    statusCode: 200,
    body: triviaInstance,
  }
})

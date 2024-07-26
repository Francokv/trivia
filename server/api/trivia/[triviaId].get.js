import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { triviaId } = event.context.params

  const trivia = await prisma.trivia.findUnique({
    where: {
      id: triviaId,
    },
  })

  console.log('trivia', trivia)
  return trivia
})

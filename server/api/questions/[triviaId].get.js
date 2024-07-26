import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { triviaId } = event.context.params

  const questions = await prisma.question.findMany({
    where: {
      triviaId,
    },
    include: {
      answers: true,
    },
  })

  return {
    status: 200,
    body: questions,
  }
})

import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { take, skip } = query

  const trivias = await prisma.trivia.findMany({
    take: take ? parseInt(take) : undefined,
    skip: skip ? parseInt(skip) : undefined,
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  console.log('trivia', trivias)
  return trivias
})

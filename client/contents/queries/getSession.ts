import { prisma } from '../client'

export async function getSession(conditions: object) {
  return await prisma.session.findFirst({
    where: conditions,
  })
}

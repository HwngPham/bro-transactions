import { prisma } from '../client'

export async function getUsers() {
  const allUsers = await prisma.user.findMany()
  return allUsers
}

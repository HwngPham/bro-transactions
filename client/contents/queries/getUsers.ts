import { prisma } from '../client'

export async function getUsers() {
  const allUsers = await prisma.accounts_user.findMany()
  return allUsers
}

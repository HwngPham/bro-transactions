import { UserSearchCondition } from '../../types/user'
import { prisma } from '../client'

export async function getUserByConditions(conditions: UserSearchCondition) {
  return await prisma.user.findFirst({
    where: conditions,
  })
}

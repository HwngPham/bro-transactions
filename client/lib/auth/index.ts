import { User } from '@prisma/client'

import { getUserByConditions } from '../../contents/queries/getUserByConditions'
import { hasher } from './hasher'

export const authenticateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await getUserByConditions({ email })

  if (user) {
    return new Promise((resolve, reject) => {
      const isPasswordMatched = hasher.verify(password, user.password)

      if (isPasswordMatched) {
        resolve(user)
      } else {
        reject(null)
      }
    })
  }

  return null
}

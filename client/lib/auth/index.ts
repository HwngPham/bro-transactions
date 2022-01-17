import { User } from '@prisma/client'

import { getUserByConditions } from '../../contents/queries/getUserByConditions'
import { hasher } from './hasher'
import { getSession } from '../../contents/queries/getSession'
import { ServerSidePropsRequest } from '../../types/http'

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

export const authenticateRequest = async (req: ServerSidePropsRequest) => {
  const redirectOptions = {
    redirect: {
      destination: '/auth/login',
      permanent: false,
    },
  }

  const session = await getSession({
    session_key: req.cookies.sessionid || '',
  })

  console.log('after', !session)

  if (!session || !session?.user_id) {
    return redirectOptions
  }

  return false
}

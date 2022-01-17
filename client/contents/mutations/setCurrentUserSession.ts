import { Session } from '../../types/session'
import { prisma } from '../client'

export async function setCurrentUserSession(userId: number, data: Session) {
  const oneWeek = 86400000 * 7

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      // @ts-expect-error
      Session: {
        create: {
          session_key: data.session_key,
          session_data: JSON.stringify(data.session_data),
          expire_date: new Date(Date.now() + oneWeek),
        },
      },
    },
    include: {
      // @ts-expect-error
      Session: true,
    },
  })
}

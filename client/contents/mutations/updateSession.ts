import { Session } from '../../types/session'
import { prisma } from '../client'

export async function updateSession(sessionId: string, data: Session | null) {
  const aWeekTime = 86400000 * 7

  const newSessionData = data
    ? {
        session_key: data.session_key,
        session_data: JSON.stringify(data.session_data),
        expire_date: new Date(Date.now() + aWeekTime),
      }
    : {
        expire_date: new Date(Date.now() + aWeekTime),
      }

  return await prisma.session.update({
    where: {
      session_key: sessionId,
    },
    data: newSessionData,
  })
}

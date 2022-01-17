import type { NextResponse, NextRequest } from 'next/server'

import { setCurrentUserSession } from '../../../contents/mutations/setCurrentUserSession'
import { getSession } from '../../../contents/queries/getSession'
import { authenticateUser } from '../../../lib/auth'

export default async function handler(req: NextRequest, res: NextResponse) {
  const { method, body, cookies } = req
  res.setHeader('Set-Cookie', req.cookies, { path: '/' })

  if (method === 'POST') {
    try {
      // @ts-expect-error
      const { email, password } = JSON.parse(body)
      const user = await authenticateUser(email, password)

      if (user) {
        // if session is not associated with user, create it!
        const currentUserSession = await getSession({
          user_id: user.id,
          session_key: cookies.sessionid,
        })

        if (!currentUserSession) {
          await setCurrentUserSession(user.id, {
            session_key: cookies.sessionid,
          })
        }
      }

      // @ts-expect-error
      res.status(200).json({
        result: JSON.stringify(user),
      })
    } catch (err) {
      console.log(err)
      // @ts-expect-error
      res.status(401).json({
        error: 'Wrong credential',
      })
    }
  }

  return res
}

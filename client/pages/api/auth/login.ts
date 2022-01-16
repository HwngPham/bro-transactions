import type { NextResponse, NextRequest } from 'next/server'

import { authenticateUser } from '../../../lib/auth'

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    try {
      // @ts-expect-error
      const { email, password } = JSON.parse(req.body)
      const user = await authenticateUser(email, password)
      // @ts-expect-error
      res.status(200).json({
        result: JSON.stringify(user),
      })
    } catch {
      // @ts-expect-error
      res.status(401).json({
        error: 'Wrong credential',
      })
    }
  }

  return res
}

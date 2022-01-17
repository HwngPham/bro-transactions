import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // verify login in here
  // const isLoggedIn = authorizer.validateRequest(req)

  // if (!isLoggedIn) {
  //   NextResponse.redirect('/auth/login')
  // }
  return NextResponse.next()
}

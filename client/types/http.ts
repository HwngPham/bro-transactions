import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

export interface ServerSidePropsRequest extends IncomingMessage {
  cookies: NextApiRequestCookies
}

import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next'

import { authenticateRequest } from '../lib/auth'

const Home: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return <h1 className="text-3xl font-bold underline">List transaction</h1>
}

export default Home

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log('begin', context.req.cookies)
  const redirectOptions = await authenticateRequest(context.req)
  if (redirectOptions) {
    return redirectOptions
  }
  return {
    props: {},
  }
}

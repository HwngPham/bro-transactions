import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { Login } from '../../containers/Login'
import { Register } from '../../containers/Register'

export default function Route(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  switch (props.action) {
    case 'login':
      return <Login />
    case 'register':
      return <Register />
    default:
      return null
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      action: context.query.action,
    },
  }
}

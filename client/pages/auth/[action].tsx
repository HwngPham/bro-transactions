import { Action } from '../../types/auth'

export default function Route() {
  return null
}

export async function getServerSideProps({ action }) {
  // console.log(action)
  console.log(Action)

  return {
    props: {},
  }
}

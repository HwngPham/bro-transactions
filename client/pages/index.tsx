import type { NextPage } from 'next'

const Home: NextPage = () => {
  return <h1 className="text-3xl font-bold underline">List transaction</h1>
}

export default Home

export async function getServerSideProps() {
  // const allUsers = await getUsers()
  // hasher.digest('1', (credential: Credential) => {
  //   console.log('credential of 1', credential)

  //   hasher.verify(
  //     {
  //       password: '2',
  //       salt: credential.salt,
  //     },
  //     credential.password,
  //     (result: boolean) => {
  //       console.log(result)
  //     }
  //   )
  // })
  return {
    props: {},
  }
}

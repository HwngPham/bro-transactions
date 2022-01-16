import type { NextPage } from 'next'
import { useEffect } from 'react'

const Home: NextPage = () => {
  useEffect(() => {
    fetch('/api/auth/login').then(console.log)
  }, [])
  return <h1 className="text-3xl font-bold underline">List transaction</h1>
}

export default Home

export async function getServerSideProps() {
  return {
    props: {},
  }
}

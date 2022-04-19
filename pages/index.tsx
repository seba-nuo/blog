import type { NextPage } from 'next'
import Head from 'next/head'
// import { useRouter } from 'next/router'
import Nav from '../components/Nav'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Blog con autenticación" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Nav />
    </div>
  )
}

export default Home

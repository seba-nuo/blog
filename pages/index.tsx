import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
// import { useRouter } from 'next/router'
// import Nav from '../components/Nav'
import Login from '../components/Login'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Blogo</title>
        <meta name="description" content="Blog con autenticación" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
      {/* <Nav /> */}
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookie = ctx.req.headers.cookie || '';
  const token = process.env.token || '';
  const hasAuth = cookie.includes(`token=${token}`);

  return { props: { hasAuth } }
}

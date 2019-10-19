
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Profile = () => {
  const router = useRouter()
  const { id, name } = router.query

  console.log(id);
  console.log(name);
  return (
    <div>
      <Head>
        <title>Test</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  )
}

Profile.getInitialProps = async ({ query }) => {
  const {
    id, name
  } = query
  console.log(query);
  return {}
}

export default Profile

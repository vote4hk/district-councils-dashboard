import React from 'react'
import { useRouter } from 'next/router'
import withData from '../../lib/apollo'
import HomeMeta from '../../components/meta/home'

const Index = () => {
  const router = useRouter()
  const { lang } = router.query

  const langQuery = lang === 'en' ? 'en' : 'zh'

  return <HomeMeta
    lang={langQuery}
  />
}

export default withData(Index)

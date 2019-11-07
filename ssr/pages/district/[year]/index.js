import React from 'react'
import { useRouter } from 'next/router'
import withData from '../../../lib/apollo'
import DistrictsMeta from '../../../components/meta/districts'

const Districts = () => {
  const router = useRouter()
  const { lang, year } = router.query

  const langQuery = lang === 'en' ? 'en' : 'zh'

  return <DistrictsMeta
    lang={langQuery} year={year}
  />
}

export default withData(Districts)

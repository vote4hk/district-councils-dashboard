import React from 'react'
import { useRouter } from 'next/router'
import withData from '../../../../lib/apollo'
import TagMeta from '../../../../components/meta/tag'

const Tag = () => {
  const router = useRouter()
  const { lang, year, tag } = router.query

  const langQuery = lang === 'en' ? 'en' : 'zh'

  return <TagMeta
    year={year} tag={tag} lang={langQuery} />
}

export default withData(Tag)

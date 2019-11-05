import React from 'react'
import { useRouter } from 'next/router'
import withData from '../../../../lib/apollo'
import ProfileMeta from '../../../../components/meta/profile'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_FETCH_PROFILE } from '../../../../lib/gql'

const Profile = () => {
  const router = useRouter()
  const { lang, id, name } = router.query

  const langQuery = lang === 'en' ? 'en' : 'zh'

  const { loading, error, data } = useQuery(QUERY_FETCH_PROFILE, {
    variables: {
      uuid: id,
    },
  })

  return <ProfileMeta
    id={id} name={name} lang={langQuery}
    loading={loading} error={error} data={data}/>
}

export default withData(Profile)

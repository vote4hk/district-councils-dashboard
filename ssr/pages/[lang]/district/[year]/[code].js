import React from 'react'
import { useRouter } from 'next/router'
import withData from '../../../../lib/apollo'
import DistrictMeta from '../../../../components/meta/district'
import ConstituencyMeta from '../../../../components/meta/constituency'
import {
  QUERY_FETCH_CONSTITUENCY,
  QUERY_FETCH_DISTRICT,
} from '../../../../lib/gql'
import { useQuery } from '@apollo/react-hooks'

const District = () => {
  const router = useRouter()
  const { lang, year, code } = router.query

  const langQuery = lang === 'en' ? 'en' : 'zh'

  if (code.length === 1) {
    const { loading, error, data } = useQuery(QUERY_FETCH_DISTRICT, {
      variables: {
        code,
      },
    })
    return <DistrictMeta
      year={year} code={code} lang={langQuery} loading={loading}
      error={error} data={data} />

  } else if (code.length === 3) {
    const { loading, error, data } = useQuery(QUERY_FETCH_CONSTITUENCY, {
      variables: {
        year,
        code,
      },
    })
    return <ConstituencyMeta
      year={year} code={code} lang={langQuery}
      loading={loading} error={error} data={data} />

  } else {
    return (
      <div>
      </div>
    )
  }
}

export default withData(District)

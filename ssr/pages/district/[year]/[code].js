
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import withData from '../../../lib/apollo'
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const QUERY_FETCH_DISTRICT = gql`
query fetch_district($year: Int!, $code: String!){
  dcd_constituencies(where:{
    year: {_eq: $year}
    code: {_eq: $code}
  }) {
    code
    district {
      dc_name_zh
      lc_name_zh
    }
    name_zh
    candidates {
      id
    }
    main_areas
  }
}`

const District = () => {
  const router = useRouter()
  const { year, code } = router.query

  const url = `https://vote4.hk/district/${year}/${code}`

  const { loading, error, data } = useQuery(QUERY_FETCH_DISTRICT, {
    variables: {
      year,
      code,
    }
  })

  if (!loading) {
    const constituency = data.dcd_constituencies.length > 0 ? data.dcd_constituencies[0] : {}
    const displayName = `${constituency.name_zh}｜${constituency.district.dc_name_zh}`
    const candidates = constituency.candidates || []
    const main_area = constituency.main_areas.map(a => Object.values(a)[0]).join(', ')
    const description = `${candidates.length > 0 && `${candidates.length}名候選人｜`}${main_area}`
    return (
      <div>
        <Head>
          <title>{`${displayName}｜Vote4HK 區議會投票指南 ✋🏻💜⚡`}</title>
          <link rel='icon' href='/favicon.ico' />
          <meta property="og:title" content={`${displayName}｜Vote4HK 區議會投票指南`} />
          <meta property="og:description" content={`${description}｜了解區選最新消息，選區背景資料丶候選人政綱及表現`} />
          <meta property="og:type" content="article" />
          <meta property="og:image" content={`https://vote4.hk/og-image.png`} />
          <meta property="og:url" content={url} />
          <meta property="article:section" content="候選人資料｜選區分界地圖｜選情數據分析" />
          <meta property="article:tag" content={`${displayName}, 政治, 區議會, 立法會, 林鄭月娥, 議員, 選舉, 候選人, 選區, 分界, 地圖, 選情, 數據, 分析`} />　
        </Head>
      </div>
    )
  } else {
    return (
      <div>
      </div>
    )
  }

}

// Profile.getInitialProps = async ({query}) => {
//   const {
//     id, name
//   } = query
//   return {}
// }

export default withData(District)


import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import withData from '../../../lib/apollo'
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const QUERY_FETCH_DISTRICT = gql`
query fetch_district($code: String!){
  dcd_districts(where:{
    dc_code: {_eq: $code}
  }) {
    dc_name_zh
  }
}`

const QUERY_FETCH_CONSTITUENCY = gql`
query fetch_constituency($year: Int!, $code: String!){
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
      camp
      nominate_status
    }
    main_areas
  }
}`

const District = () => {
  const router = useRouter()
  const { year, code } = router.query

  const url = `https://vote4.hk/district/${year}/${code}`


  // 18 districts
  if (code.length === 1) {
    const { loading, error, data } = useQuery(QUERY_FETCH_DISTRICT, {
      variables: {
        code,
      }
    })

    if (!loading) {
      const district = data.dcd_districts.length > 0 ? data.dcd_districts[0] : {}
      const displayName = `${district.dc_name_zh}`

      return (
        <div>
          <Head>
            <title>{`${displayName}｜Vote4HK 區議會投票指南 ✋🏻💜⚡`}</title>
            <link rel='icon' href='/favicon.ico' />
            <meta property="og:title" content={`${displayName}｜Vote4HK 區議會投票指南`} />
            <meta property="og:description" content={`了解區選最新消息，選區背景資料丶候選人政綱及表現`} />
            <meta property="og:type" content="article" />
            <meta property="og:image" content={`https://vote4.hk/og-image.png`} />
            <meta property="og:url" content={url} />
            <meta property="article:section" content="候選人資料｜選區分界地圖｜選情數據分析" />
            <meta property="article:tag" content={`${displayName}, 政治, 區議會, 立法會, 林鄭月娥, 議員, 選舉, 候選人, 選區, 分界, 地圖, 選情, 數據, 分析`} />　
          </Head>
        </div>
      )
    }else {
      return (
        <div>
        </div>
      )
    }


  }
  else if (code.length === 3) {
    const { loading, error, data } = useQuery(QUERY_FETCH_CONSTITUENCY, {
      variables: {
        year,
        code
      }
    })

    if (!loading) {

      const constituency = data.dcd_constituencies.length > 0 ? data.dcd_constituencies[0] : {}
      const displayName = `${constituency.name_zh}｜${constituency.district.dc_name_zh}`
      const candidates = constituency.candidates.filter(candidate => candidate.nominate_status !== 'disqualified') || []
      const main_area = constituency.main_areas.map(a => Object.values(a)[0]).join(', ')
      const candi_camp_count = {}
      candidates.forEach(candidate => {
        let camp = candidate.camp || '其他'
        if (!candi_camp_count[camp]) {
          candi_camp_count[camp] = 1
        } else {
          candi_camp_count[camp]++
        }
      })

      const candi_camp_summary = [
        (candi_camp_count['民主'] && `民主：${candi_camp_count['民主']}`),
        (candi_camp_count['建制'] && `建制：${candi_camp_count['建制']}`),
        (candi_camp_count['其他'] && `其他：${candi_camp_count['其他']}`)
      ].filter(c => typeof c !== 'undefined')


      let clash = ""
      if (candi_camp_count['民主'] > 1) clash = clash + `民主派`
      if (candi_camp_count['建制'] > 1) clash = clash + `建制派`
      if (clash.length > 0) clash = clash + `撞區｜`

      const description = `${clash}${candidates.length > 3 ? `${candidates.length}人混戰` : `${candidates.length}名候選人`}｜${candi_camp_summary.join(' ')}｜${main_area}`

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
            <meta property="article:tag" content={`${displayName}, vote4hk, vote4, 投票指南, 區議會選舉, 區議會, 區選, 選舉, 2019 dc, district council election, 掌心雷, 候選人, 選區, 分界, 地圖, 選情, 數據, 分析`} />
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





}

// Profile.getInitialProps = async ({query}) => {
//   const {
//     id, name
//   } = query
//   return {}
// }

export default withData(District)

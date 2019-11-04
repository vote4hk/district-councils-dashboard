
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import withData from '../../../lib/apollo'
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const QUERY_FETCH_PROFILE = gql`
query fetch_user($uuid: uuid!){
  dcd_people(where:{uuid: {_eq: $uuid}}) {
    name_zh
    name_en
    related_organization
    estimated_yob
    candidates(order_by:{
      year: desc
    }) {
      year
      cacode
      constituency {
        name_zh
        district {
          dc_name_zh
        }
      }
      occupation
      political_affiliation
    }
  }
}`

const Profile = () => {
  const router = useRouter()
  const { id, name } = router.query

  const url = `https://vote4.hk/profile/${name}/${id}`

  const { loading, error, data } = useQuery(QUERY_FETCH_PROFILE, {
    variables: {
      uuid: id
    }
  })

  if (!loading) {
    const person = data.dcd_people.length > 0 ? data.dcd_people[0] : {}
    const displayName = person.name_zh || person.name_en
    const candidate = person.candidates ? person.candidates[0] || {} : {}
    const description = `${candidate.constituency.district.dc_name_zh} - ${candidate.constituency.name_zh}｜${candidate.political_affiliation || '-'}｜${candidate.year}年｜第${person.candidates.length}次參選${person.estimated_yob && person.estimated_yob !== '1990' ? `｜${person.estimated_yob}年出生` : ''}`
    return (
      <div>
        <Head>
          <title>{`${displayName}｜Vote4HK 區議會投票指南 ✋🏻💜⚡`}</title>
          <link rel='icon' href='/favicon.ico' />
          <meta property="og:title" content={`${displayName}｜Vote4HK 區議會投票指南`} />
          <meta property="og:description" content={`${description}｜了解區選最新消息，選區背景資料丶候選人政綱及表現`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={`https://vote4.hk/static/images/avatar/${id}.jpg`} />
          <meta property="og:image:width" content="770" />
          <meta property="og:image:height" content="980" />
          <meta property="og:url" content={url} />
          <meta property="article:section" content="候選人資料｜選區分界地圖｜選情數據分析" />
          <meta property="article:tag" content={`${displayName}, vote4hk, vote4, 投票指南, 區議會選舉, 區議會, 區選, 選舉, 2019 dc, district council election, 掌心雷, 候選人, 選區, 分界, 地圖, 選情, 數據, 分析`} />
        </Head>
        <div>
          {displayName}
        </div>

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

export default withData(Profile)

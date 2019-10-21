
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
    candidates(order_by:{
      year: desc
    }) {
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
    const description = `${candidate.constituency.district.dc_name_zh} | ${candidate.constituency.name_zh} | ${candidate.political_affiliation} `
    return (
      <div>
        <Head>
          <title>Vote4HK - {name}</title>
          <link rel='icon' href='/favicon.ico' />
          <meta property="og:title" content={`${displayName} | 2019區議會選舉 | 投票指南 | 候選人資料 | 選區分界地圖 | 選情數據分析`} />
          <meta property="og:description" content={`${description}| 2019區議會選舉於11月24日投票，選出18區452名區議員，提供區選最新消息，輸入地址或搜尋候選人，了解身處選區的背景資料丶候選人政綱及表現。`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={`https://vote4.hk/static/images/avatar/${id}.jpg`} />
          <meta property="og:image:width" content="770" />
          <meta property="og:image:height" content="980" />
          <meta property="og:url" content={url} />
          <meta property="article:section" content="政情" />
          <meta property="article:tag" content={`${displayName}, 政治, 立法會, 特首, 林鄭月娥, 議員, 選舉, 行政會議, 區議會, 撥款, 委員會, 林鄭月娥, 特首, 候任特首, 特區政府, 高官, 問責官員, 班子, 內閣, 司長, 局長`} />
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

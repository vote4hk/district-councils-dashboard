
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
    candidates {
      cacode
      occupation
      political_affiliation
    }
  }
}`

const Profile = () => {
  const router = useRouter()
  const { id, name } = router.query

  console.log(id);
  console.log(name);

  const url = `https://vote4.hk/profile/${name}/${id}`

  const { loading, error, data } = useQuery(QUERY_FETCH_PROFILE, {
    variables: {
      uuid: id
    }
  })

  if (!loading) {
    return (
      <div>
        <Head>
          <title>Vote4HK - {name}</title>
          <link rel='icon' href='/favicon.ico' />
          <meta property="og:title" content="【區議會選舉2019】民間團體崛起　重現80年代民主派組黨之路？" />
          <meta property="og:description" content="區議會選舉提名期結束，今年的特色除了首次沒有自動當選的「白區」之外，另一項是有大量地區組織參選。有些組織專注當區的事務，亦有不少就近期社會事件發表意見。回看歷史，1985年區議會選舉以及1986年區域市政局成立之後，不少壓力團體、區議員及居民團體，慢慢整合成各個泛民政黨。今次新興地區議政團體再現，是否新興政黨成立的前奏？" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={url} />
          <meta property="article:section" content="政情" />
          <meta property="article:tag" content="政治, 立法會, 特首, 林鄭月娥, 議員, 選舉, 行政會議, 區議會, 撥款, 委員會, 林鄭月娥, 特首, 候任特首, 特區政府, 高官, 問責官員, 班子, 內閣, 司長, 局長" />
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

export default withData(Profile)

import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import withData from '../../../lib/apollo'
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { NextSeo } from 'next-seo'
import { ArticleJsonLd } from 'next-seo'

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

    const metaTitle = `${displayName}｜Vote4HK 區議會投票指南 ✋🏻💜⚡`
    const metaDescription = `${description}｜了解區選最新消息，選區背景資料丶候選人政綱及表現`
    const metaKeyword = `${displayName}, vote4hk, vote4, 投票指南, 區議會選舉, 區議會, 區選, 選舉, 2019 dc, district council election, 掌心雷, 候選人, 選區, 分界, 地圖, 選情, 數據, 分析`
    const metaImageUrl = `https://vote4.hk/static/images/avatar/${id}.jpg`
    return (
      <div>
        <Head>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <NextSeo
          title={metaTitle}
          description={metaDescription}
          canonical={url}
          additionalMetaTags={
            [
              {
                property: 'keywords',
                content: metaKeyword
              }
            ]
          }
          openGraph={{
            url: url,
            title: metaTitle,
            description: metaDescription,
            type: 'website',
            images: [
              {
                url: metaImageUrl
              }
            ],
            site_name: 'Vote4HK 區議會投票指南 ✋🏻💜⚡',
            article: {
              section: "候選人資料｜選區分界地圖｜選情數據分析",
              tag: metaKeyword
          }
          }}
          facebook={{
            appId: 1054004544930933,
          }}
          twitter={{
            cardType: 'summary_large_image',
          }}
        />
        <ArticleJsonLd
          url={url}
          title={metaTitle}
          images={[
            metaImageUrl,
          ]}
          datePublished="2019-11-01T00:00:00+08:00"
          dateModified="2019-11-01T00:00:00+08:00"
          authorName="Vote4HK"
          publisherName="Vote4HK"
          publisherLogo={metaImageUrl}
          description={metaDescription}
        />

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

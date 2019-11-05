import React from 'react'
import Head from 'next/head'
import { ArticleJsonLd, NextSeo } from 'next-seo'

const DistrictMeta = (props) => {
  const { year, code, lang, loading, error, data } = props

  const url = lang === 'en'
    ? `https://vote4.hk/en/district/${year}/${code}`
    : `https://vote4.hk/district/${year}/${code}`

  if (!loading) {
    const district = data.dcd_districts.length > 0
      ? data.dcd_districts[0]
      : {}
    const displayName = lang === 'en'
      ? district.dc_name_en
      : district.dc_name_zh

    const metaSiteMap = 'Vote4HK 區議會投票指南 ✋🏻💜⚡'
    const metaTitle = `${displayName}｜Vote4HK 區議會投票指南 ✋🏻💜⚡`
    const metaDescription = `了解區選最新消息，選區背景資料丶候選人政綱及表現`
    const metaKeyword = `${displayName}, vote4hk, vote4, 投票指南, 區議會選舉, 區議會, 區選, 選舉, 2019 dc, district council election, 掌心雷, 候選人, 選區, 分界, 地圖, 選情, 數據, 分析`
    const metaImageUrl = 'https://vote4.hk/og-image.png'
    const metaArticleSection = '候選人資料｜選區分界地圖｜選情數據分析'

    return (
      <div>
        <Head>
          <link rel='icon' href='/favicon.ico'/>
        </Head>

        <NextSeo
          title={metaTitle}
          description={metaDescription}
          canonical={url}
          additionalMetaTags={
            [
              {
                property: 'keywords',
                content: metaKeyword,
              },
            ]
          }
          openGraph={{
            url: url,
            title: metaTitle,
            description: metaDescription,
            type: 'website',
            images: [
              {
                url: metaImageUrl,
              },
            ],
            site_name: metaSiteMap,
            article: {
              section: metaArticleSection,
              tag: metaKeyword,
            },
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

      </div>
    )
  } else {
    return (
      <div>
      </div>
    )
  }

}

export default DistrictMeta

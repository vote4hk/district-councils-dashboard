import React from 'react'
import Head from 'next/head'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import zh from '../../lib/locale/zh'
import en from '../../lib/locale/en'

const DistrictMeta = (props) => {
  const { year, code, lang, loading, error, data } = props

  const meta = lang === 'en' ? en : zh

  if (!loading) {
    const district = data.dcd_districts.length > 0
      ? data.dcd_districts[0]
      : {}
    const districtName = lang === 'en'
      ? district.dc_name_en
      : district.dc_name_zh
    const areaName = lang === 'en'
      ? district.lc_name_en
      : district.lc_name_zh

    const constituenciesNames = lang === 'en'
      ? district.constituencies.map(c => c.name_en).join('、')
      : district.constituencies.map(c => c.name_zh).join('、')

    const canonicalUrl = meta.formatDistrictCanonicalUrl(year, code, lang)
    const metaSiteMap = meta.formatSiteName()
    const metaTitle = meta.formatDistrictTitle(districtName, areaName)
    const metaDescription = meta.formatDistrictDescription(districtName,
      areaName, constituenciesNames.slice(0, 5))
    const metaKeyword = meta.formatKeyword(districtName)
    const metaImageUrl = meta.formatImageUrl()
    const metaArticleSection = meta.formatArticleSection()

    return (
      <div>
        <Head>
          <link rel='icon' href='/favicon.ico'/>
        </Head>

        <NextSeo
          title={metaTitle}
          description={metaDescription}
          canonical={canonicalUrl}
          additionalMetaTags={
            [
              {
                property: 'keywords',
                content: metaKeyword,
              },
            ]
          }
          openGraph={{
            url: canonicalUrl,
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
          url={canonicalUrl}
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

        <h1>
          {districtName}
        </h1>

        <h2>
          {constituenciesNames}
        </h2>

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

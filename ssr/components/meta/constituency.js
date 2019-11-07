import React from 'react'
import Head from 'next/head'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import zh from '../../lib/locale/zh'
import en from '../../lib/locale/en'

const ConstituencyMeta = (props) => {
  const { year, code, lang, loading, error, data } = props

  const meta = lang === 'en' ? en : zh

  if (!loading) {
    const constituency = data.dcd_constituencies.length > 0
      ? data.dcd_constituencies[0]
      : {}

    const constituencyName = lang === 'en'
      ? constituency.name_en : constituency.name_zh
    const constituencyCode = constituency.code
    const districtName = lang === 'en'
      ? constituency.district.dc_name_en : constituency.district.dc_name_zh
    const areaName = lang === 'en'
      ? constituency.district.lc_name_en
      : constituency.district.lc_name_zh
    const mainAreasNames = lang === 'en'
      ? constituency.main_areas.map(a => Object.values(a)[0]).join(', ')
      : constituency.main_areas.map(a => Object.values(a)[0]).join(', ')

    const canonicalUrl = meta.formatConstituencyCanonicalUrl(year, code)
    const metaSiteMap = meta.formatSiteName()
    const metaTitle = meta.formatConstituencyTitle(constituencyName, constituencyCode, districtName, areaName)
    const metaDescription = meta.formatConstituencyDescription(constituencyName, constituencyCode, mainAreasNames)
    const metaKeyword = meta.formatKeyword(constituencyName)
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
          {districtName}－{constituencyName}
        </h1>

        <h2>
          {mainAreasNames}
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

export default ConstituencyMeta

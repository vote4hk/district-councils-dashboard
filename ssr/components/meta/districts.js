import React from 'react'
import Head from 'next/head'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import zh from '../../lib/locale/zh'
import en from '../../lib/locale/en'

const DistrictsMeta = (props) => {
  const { lang, year } = props

  const meta = lang === 'en' ? en : zh

  const metaCanonicalUrl = meta.formatDistrictsCanonicalUrl(year)
  const metaSiteMap = meta.formatSiteName()
  const metaTitle = meta.formatDistrictsTitle()
  const metaDescription = meta.formatDistrictsDescription()
  const metaKeyword = meta.formatKeyword()
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
        canonical={metaCanonicalUrl}
        additionalMetaTags={
          [
            {
              property: 'keywords',
              content: metaKeyword,
            },
          ]
        }
        openGraph={{
          url: metaCanonicalUrl,
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
        url={metaCanonicalUrl}
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

      <h1>{metaTitle}</h1>

      <h2>{metaDescription}</h2>

    </div>
  )
}

export default DistrictsMeta

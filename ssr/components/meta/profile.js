import React from 'react'
import Head from 'next/head'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import zh from '../../lib/locale/zh'
import en from '../../lib/locale/en'

const ProfileMeta = (props) => {
  const { id, name, lang, loading, error, data } = props

  const meta = lang === 'en' ? en : zh

  if (!loading) {
    const person = data.dcd_people.length > 0 ? data.dcd_people[0] : {}
    const candidate = person.candidates ? person.candidates[0] || {} : {}

    const candidateName = lang === 'en'
      ? (person.name_en || person.name_zh)
      : (person.name_zh || person.name_en)
    const constituencyName = lang === 'en'
      ? candidate.constituency.name_en
      : candidate.constituency.name_zh
    const constituencyCode = candidate.constituency.code
    const districtName = lang === 'en'
      ? candidate.constituency.district.dc_name_en
      : candidate.constituency.district.dc_name_zh
    const areaName = lang === 'en'
      ? candidate.constituency.district.lc_name_en
      : candidate.constituency.district.lc_name_zh
    const candidateNumber = candidate.candidate_number
    const mainAreasNames = lang === 'en'
      ? candidate.constituency.main_areas.map(a => Object.values(a)[0]).join(', ')
      : candidate.constituency.main_areas.map(a => Object.values(a)[0]).join(', ')

    const metaURL = meta.formatCandidateCanonicalUrl(name, id)
    const metaSiteMap = meta.formatSiteName()
    const metaTitle = meta.formatCandidateTitle(candidateName, constituencyName, constituencyCode, districtName)
    const metaDescription = meta.formatCandidateDescription(candidateName, constituencyName, constituencyCode, districtName, areaName, candidateNumber, mainAreasNames)
    const metaKeyword = meta.formatKeyword(candidateName)
    const metaImageUrl = meta.formatCandidateImageUrl(id)
    const metaArticleSection = meta.formatArticleSection()

    return (
      <div>
        <Head>
          <link rel='icon' href='/favicon.ico'/>
        </Head>

        <NextSeo
          title={metaTitle}
          description={metaDescription}
          canonical={metaURL}
          additionalMetaTags={
            [
              {
                property: 'keywords',
                content: metaKeyword,
              },
            ]
          }
          openGraph={{
            url: metaUrl,
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
          url={metaUrl}
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
          {candidateName}
        </h1>

        <h2>
          {districtName}－{constituencyName}（{constituencyCode}）
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


export default ProfileMeta

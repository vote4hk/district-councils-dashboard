// Do this as the first thing so that any code reading it knows the right env.
require('dotenv').config()
const axios = require('axios')
const moment = require('moment')
const fs = require('fs')

const XML_TEMPLATE = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url><loc>https://dce2019.vote4.hk/</loc><lastmod>${moment().format(
  'YYYY-MM-DDTHH:mm:ssZ'
)}</lastmod><changefreq>daily</changefreq><priority>1.00</priority></url>
__PROFILE_URLS__
__DISTRICT_URLS__
</urlset>
`

const GET_ALL_PEOPLE = `
query {
  dcd_people {
    name_zh
    name_en
    uuid
  }
  dcd_constituencies(where: {year: {_eq: 2019}}) {
    code
  }
}`
console.log(process.env.REACT_APP_GRAPHQL_URI)

async function main() {
  const res = await axios.post(process.env.REACT_APP_GRAPHQL_URI, {
    query: GET_ALL_PEOPLE,
  })
  let xml = XML_TEMPLATE
  const { dcd_people, dcd_constituencies } = res.data.data
  const lastMod = moment().format('YYYY-MM-DDTHH:mm:ssZ')
  const peopleLinks = dcd_people.map(
    person =>
      `<url><loc>https://dce2019.vote4.hk/profile/${person.name_zh ||
        person.zame_en}/${
        person.uuid
      }</loc><lastmod>${lastMod}</lastmod><changefreq>daily</changefreq><priority>1.00</priority></url>`
  )

  const districtLinks = dcd_constituencies.map(
    c =>
      `<url><loc>https://dce2019.vote4.hk/district/2019/${c.code}</loc><lastmod>${lastMod}</lastmod><changefreq>daily</changefreq><priority>1.00</priority></url>`
  )
  xml = xml.replace('__PROFILE_URLS__', peopleLinks.join('\n'))
  xml = xml.replace('__DISTRICT_URLS__', districtLinks.join('\n'))

  fs.writeFileSync('public/sitemap.xml', xml)
}

main()
  .then()
  .catch(err => {
    console.error(err)
  })

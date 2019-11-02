const apolloClient = require('./apollo')
const { QUERY_GET_ALL_DISTRICTS } = require('./queries/gql')

const year = 2019

const getDistricts = async () => {
  let urls = []
  urls.push({ url: '/', changefreq: 'daily', priority: 1 })

  return apolloClient.query({
    query: QUERY_GET_ALL_DISTRICTS,
    variables: {
      year,
    },
  }).then(data => {
    const districts = data.data.dcd_districts ? data.data.dcd_districts : []

    // List Districts, Constituencies and Candidates in correct order

    /*
    // Districts
    districts.forEach(district => {
      urls.push({
        url: `/district/${year}/${district.dc_code}`,
        changefreq: 'daily',
        priority: 0.9,
      })
    })
    */

    // Constituencies
    districts.forEach(district => {
      const constituencies = district.constituencies
        ? district.constituencies
        : []
      constituencies.forEach(constituency => {
        urls.push({
          url: `/district/${year}/${constituency.code}`,
          changefreq: 'daily',
          priority: 0.8,
        })
      })
    })

    // Candidates
    districts.forEach(district => {
      const constituencies = district.constituencies
        ? district.constituencies
        : []
      constituencies.forEach(constituency => {
        const candidates = constituency.candidates
          ? constituency.candidates
          : []
        candidates.forEach(candidate => {
          urls.push({
            url: `/profile/${candidate.person.name_zh ||
            candidate.person.name_en}/${candidate.person.uuid}`,
            img: [
              {
                title: candidate.person.name_zh || candidate.person.name_en,
                url: `/static/images/avatar/${candidate.person.uuid}.jpg`,
              },
            ],
            changefreq: 'daily',
            priority: 0.7,
          })
        })
      })
    })
    return urls
  }).catch(err => {
    return urls
  })
}

module.exports = {
  getDistricts: getDistricts
}

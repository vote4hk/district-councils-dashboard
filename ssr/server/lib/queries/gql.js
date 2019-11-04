const { gql } = require('apollo-boost')

const DISTRICT_DATA = `
area_code
area_name_zh
dc_code
dc_name_zh
dc_description_zh
constituencies( where: { year: { _eq: $year } }, order_by: {code: asc} ) {
  id
  name_zh
  code
  candidates( where: { year: { _eq: $year } }, order_by: {candidate_number: asc} ) {
    candidate_number
    is_won
    political_affiliation
    election_type
    camp
    person {
      id
      uuid
      name_zh
      name_en
      related_organization
    }
    nominate_status
    tags {
      tag
      type
    }
  }
}
`

export const QUERY_GET_ALL_DISTRICTS = gql`
  query($year: Int!) {
    dcd_districts(order_by: {dc_code: asc}) {
      ${DISTRICT_DATA}
    }
  }
`

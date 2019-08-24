// TODO: split this
import gql from 'graphql-tag'

const CONSTITUENCIES_DATA = `
name_zh
name_en
district {
  dc_name_en
  dc_name_zh
  area_name_en
  area_name_zh
}
code
deviation_percentage
expected_population
main_areas
vote_stats {
  count
  type
  subtype
  category_1
  category_2
}
stations {
  station_code
  name_en
  name_zh
  location
}
tags {
  tag
}
councilors {
  political_affiliation
  person {
    id
    uuid
    name_zh
    name_en
  }
}
candidates {
  candidate_number
  political_affiliation
  camp
  person {
    id
    uuid
    name_zh
    name_en
  }
  vote_percentage
  votes
  is_won
}
`

export const QUERY_CONSTITUENCIES = gql`
query($year: Int!, $code: String!) {
  dcd_constituencies(where: { year: { _eq: $year }, code: { _eq: $code } }) {
    ${CONSTITUENCIES_DATA}
    predecessors {
      predecessor {
        ${CONSTITUENCIES_DATA}
      }
    }
  }  
}
`

export const QUERY_CONSTITUENCY_STATS = gql`
  query($year: Int!, $code: String!) {
    dcd_constituencies(where: { year: { _eq: $year }, code: { _eq: $code } }) {
      vote_stats {
        count
        type
        subtype
        category_1
        category_2
      }
    }
  }
`

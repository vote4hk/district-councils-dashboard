// TODO: split this
import gql from 'graphql-tag'

const CONSTITUENCIES_DATA = `
id
name_zh
name_en
district {
  dc_code
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
  type
}
`

export const QUERY_CONSTITUENCIES = gql`
query($year: Int!, $code: String!) {
  dcd_constituencies(where: { year: { _eq: $year }, code: { _eq: $code } }) {
    ${CONSTITUENCIES_DATA}
    predecessors {
      intersect_area
      predecessor {
        ${CONSTITUENCIES_DATA}
      }
    }
  }  
}
`

export const QUERY_GET_CONSTITUENCIES_BY_TAG = gql`
query($year: Int!, $tag: String!) {
  dcd_constituencies(
    where: { year: { _eq: $year }, tags: { tag: {_eq: $tag} } }
    order_by: {code: asc }
  ) {
    ${CONSTITUENCIES_DATA}
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

export const QUERY_GET_DISTRICT = gql`
  query($year: Int!, $code: String!) {
    dcd_districts( where: { dc_code: { _eq: $code} }) {
      area_code
      area_name_zh
      dc_code
      dc_name_zh
      constituencies( where: { year: { _eq: $year } }, order_by: {code: asc} ) {
        ${CONSTITUENCIES_DATA}
      }
    }
  }
`

export const QUERY_GET_AREA = gql`
  query {
    dcd_districts {
      area_code
      area_name_zh
      dc_code
      dc_name_zh
      constituencies(where: { year: { _eq: 2019 } }) {
        code
        name_zh
      }
    }
  }
`

export const QUERY_GET_PERSON_ELECTIONS = gql`
  query get_person_elections($person_id: Int!) {
    dcd_people_by_pk(id: $person_id) {
      candidates(order_by: { year: desc }) {
        year
        constituency {
          name_zh
          code
        }
        election_type
        camp
        political_affiliation
        votes
        is_won
      }
    }
  }
`

export const QUERY_GET_PERSON_MEETING_ATTENDANCES = gql`
  query get_meeting_attendance($person_id: Int!) {
    dcd_councillors(where: { person: { id: { _eq: $person_id } } }) {
      year
      cacode
      term_from
      term_to
      career
      district {
        dc_name_zh
      }
      political_affiliation
      post
      constituency {
        id
        name_zh
      }
      meeting_attendances(
        order_by: { meeting: { meet_year: desc }, total: desc }
      ) {
        meeting {
          meet_name
          meet_type
          meet_year
        }
        attended
        total
      }
    }
  }
`

export const QUERY_GET_COUNCILLOR_AND_CANDIDATES = gql`
  query fetch_councillors($year: Int!, $code: String!) {
    dcd_councillors(
      where: { cacode: { _eq: $code }, year: { _eq: $year } }
      order_by: { term_to: desc }
    ) {
      year
      term_to
      term_from
      political_affiliation
      constituency {
        name_zh
        name_en
        code
      }
      person {
        id
        name_en
        name_zh
        uuid
        candidates(order_by: { year: desc }) {
          votes
          is_won
          year
          cacode
          election_type
          constituency {
            year
            name_en
            name_zh
            candidates {
              person {
                id
                name_en
                name_zh
              }
              year
              election_type
              votes
              political_affiliation
            }
          }
        }
      }
    }
  }
`

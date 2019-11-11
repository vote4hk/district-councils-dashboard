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
description
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

const DISTRICT_DATA = `
area_code
area_name_zh
area_name_en
dc_code
dc_name_zh
dc_name_en
dc_description_zh
constituencies( where: { year: { _eq: $year } }, order_by: {code: asc} ) {
  id
  name_zh
  name_en
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

export const QUERY_GET_CONSTITUENCIES_BY_DISTRICT_CODES = gql`
query($year: Int!, $dc: [String!]) {
  dcd_constituencies(
    where: { year: { _eq: $year }, code: { _in: $dc } } 
    order_by: {code: asc }
  ) {
    ${CONSTITUENCIES_DATA}
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
    dcd_districts( where: { dc_code: { _eq: $code} } ) {
      ${DISTRICT_DATA}
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

export const QUERY_GET_AREA = gql`
  query {
    dcd_districts {
      area_code
      area_name_en
      area_name_zh
      dc_code
      dc_name_en
      dc_name_zh
      constituencies(where: { year: { _eq: 2019 } }) {
        code
        name_zh
        name_en
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
          name_en
          code
        }
        election_type
        camp
        political_affiliation
        political_affiliation_zh
        political_affiliation_en
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

export const QUERY_GET_COUNCILLOR = gql`
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

export const QUERY_GET_CANDIDATES = gql`
  query fetch_candidates($year: Int!, $code: String!) {
    dcd_candidates(
      where: { cacode: { _eq: $code }, year: { _eq: $year } }
      order_by: { candidate_number: asc }
    ) {
      candidate_number
      is_won
      political_affiliation
      political_affiliation_en
      political_affiliation_zh
      election_type
      camp
      nominate_status
      tags {
        tag
        type
      }
      person {
        id
        uuid
        name_zh
        name_en
        related_organization
        description
      }
    }
  }
`

// This is a dangerous query.. the data size is huge (for 2019 it is 19MB)
export const QUERY_GET_CONSTITUENCY_CAMP_DATA = gql`
  query fetch_camp_data($year: Int!) {
    dcd_constituencies(where: { year: { _eq: $year } }) {
      code
      predecessors(limit: 1, order_by: { intersect_area: desc }) {
        predecessor {
          code
          candidates {
            camp
            votes
            is_won
          }
          vote_stats(where: { subtype: { _eq: "NEW_VOTERS" } }) {
            type
            subtype
            category_1
            category_2
            count
          }
        }
      }
      vote_stats {
        type
        subtype
        category_1
        category_2
        count
      }
    }
  }
`

export const QUERY_GET_NOMINATION_SUMMARY = gql`
  query {
    c2019: dcd_constituencies(where: { year: { _eq: 2019 } }) {
      code
      name_en
      name_zh
      district {
        dc_code
        dc_name_en
        dc_name_zh
      }
      candidates {
        camp
        nominated_at
        nominate_status
        election_type
        tags {
          tag
          type
        }
      }
      tags {
        tag
      }
    }

    c2015: dcd_constituencies(where: { year: { _eq: 2015 } }) {
      code
      name_en
      name_zh
      candidates {
        votes
      }
    }
  }
`

export const QUERY_GET_CONFIG = gql`
  query fetch_config($key: String!) {
    dcd_config(where: { key: { _eq: $key } }) {
      value
    }
  }
`

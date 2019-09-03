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
councillors {
  political_affiliation
  person {
    id
    uuid
    name_zh
    name_en
    candidates { # to get the tags for the councilors
      year
      is_won
      votes
      constituency {
        year
        candidates {
          person_id
          votes
        }
      }
    }
    councillors { # to get the tags for the councilors
      year
      constituency {
        code
        name_zh
      }
    } 
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
    candidates { # to get the tags for the councilors
      year
      is_won
      votes
      constituency {
        year
        candidates {
          person_id
          votes
        }
      }
    }
    councillors { # to get the tags for the councilors
      year
      constituency {
        code
      }
    } 
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
      intersect_area
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

export const QUERY_GET_AREA = gql`
  query {
    dcd_districts {
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

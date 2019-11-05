import { gql } from 'apollo-boost'

export const QUERY_FETCH_DISTRICT = gql`
query fetch_district($code: String!) {
    dcd_districts(where:{
        dc_code: {_eq: $code}
    }) {
        dc_name_zh
        dc_name_en
    }
}`

export const QUERY_FETCH_CONSTITUENCY = gql`
query fetch_constituency($year: Int!, $code: String!) {
    dcd_constituencies(where:{
        year: {_eq: $year}
        code: {_eq: $code}
    }) {
        code
        district {
            dc_name_zh
            dc_name_en
            lc_name_zh
            lc_name_en
        }
        name_zh
        name_en
        candidates {
            camp
            nominate_status
        }
        main_areas
    }
}`

export const QUERY_FETCH_PROFILE = gql`
query fetch_user($uuid: uuid!) {
    dcd_people(where:{uuid: {_eq: $uuid}}) {
        name_zh
        name_en
        related_organization
        estimated_yob
        candidates(order_by:{
            year: desc
        }) {
            year
            cacode
            constituency {
                name_zh
                name_en
                district {
                    dc_name_zh
                    dc_name_en
                }
            }
            occupation
            political_affiliation
        }
    }
}`

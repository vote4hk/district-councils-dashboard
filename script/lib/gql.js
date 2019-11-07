const QUERY_GET_PEOPLE = `{
  dc_people {
    id
    name_en
    name_zh
    estimated_yob
  }
}`;

const QUERY_GET_CONSTITUENCY = `
query ($year: Int!, $code:String!) {
  dc_constituencies(where: {
    year: { _eq: $year }
    code: { _eq: $code }
  }) {
    id    
  }
}`

const QUERY_GET_CONSTITUENCIES = `{
  dc_constituencies(order_by: {
    year: asc
    code: asc    
  }) {
    id
    code
    year
    name_en
    name_zh
    expected_population
    deviation_percentage
    main_areas
    boundaries
  }
}`;

const QUERY_GET_CANDIDATES = `query {
  dc_candidates(order_by: {
    year: asc
    cacode: asc    
  }) {
    people_id
    year
    cacode
    candidate_number
    occupation_zh
    occupation_en
    votes
    is_won  	
  }
}`;




const QUERY_UPSERT_DISTRICT_NAME = `
mutation insert_dc_constituencies($objects: [dc_constituencies_insert_input!]!){
  insert_dc_constituencies(objects: $objects
  on_conflict:{
    constraint: dc_boundaries_code_year_key
    update_columns: [name_en, name_zh]
  }) {
    affected_rows
  }
}`;

const MUTATION_UPSERT_VOTE_DATA = `
mutation insert_dc_constituencies(
  $year: Int!
  $code: String!
  $votes: [dc_constituency_vote_stats_insert_input!]!){
  insert_dc_constituencies(objects: {
    year: $year
    code: $code    
    vote_stats: {
      data: $votes
      on_conflict: {
        constraint: dc_constituency_metrics_station_code_year_key
        update_columns: [name_en, name_zh]
      }
    }
  }
  on_conflict:{
    constraint: dc_boundaries_code_year_key
    update_columns: [code]
  }) {
    affected_rows
  }
}`;

const MUTATION_UPSERT_VOTE_STATS = `
mutation insertStats($vote_stat:dc_constituency_vote_stats_insert_input!){
  insert_dc_constituency_vote_stats(objects:[$vote_stat]
  on_conflict: {
    constraint: dc_constituency_vote_stats_constituency_id_key
    update_columns: [total_votes]
  }) {
    returning {
      id
    }
  }
}`;

const MUTATION_UPDATE_CANDIDATE_CAMP = `
mutation updateCamp($year:Int!, $cacode:String!, $personCompare: dc_people_bool_exp, $camp:String){
  update_dc_candidates(where:{
    year: {_eq: $year},
    cacode: {_eq: $cacode},
    person: $personCompare
  }, _set:{
    camp: $camp
  }) {
    affected_rows
  }
}
`

module.exports = {
  QUERY_GET_PEOPLE,
  QUERY_UPSERT_DISTRICT_NAME,
  QUERY_GET_CONSTITUENCIES,
  QUERY_GET_CANDIDATES,
  MUTATION_UPSERT_VOTE_DATA,
  MUTATION_UPSERT_VOTE_STATS,
  MUTATION_UPDATE_CANDIDATE_CAMP,
  QUERY_GET_CONSTITUENCY,
};

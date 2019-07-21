const QUERY_GET_PEOPLE = `{
  dc_people {
    id
    name_en
    name_zh
    estimated_yob
  }
}`;

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
    occupation
    votes
    vote_percentage
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

const MUTATION_UPSERT_VOTE_DATA= `
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

module.exports = {
  QUERY_GET_PEOPLE,
  QUERY_UPSERT_DISTRICT_NAME,
  QUERY_GET_CONSTITUENCIES,
  QUERY_GET_CANDIDATES,
  MUTATION_UPSERT_VOTE_DATA,
};

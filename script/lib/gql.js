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

module.exports = {
  QUERY_GET_PEOPLE,
  QUERY_UPSERT_DISTRICT_NAME,
  QUERY_GET_CONSTITUENCIES,
};

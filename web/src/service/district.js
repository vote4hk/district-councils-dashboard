import { fetchData } from '../utils/httpClient'

export const getDistrictDataByYearCode = async (year, code) => {
    // It should call GraphQL
    if (!year || !code) return

    const query = `
    {
        dc_constituencies(where: {year: {_eq: ${year}}, code: {_eq: "${code}"}}) {
          name_zh
          name_en
          code
          deviation_percentage
          expected_population
          main_areas
          candidates {
            candidate_number
            person {
              name_zh
              name_en
            }
            political_affiliation {
              name_zh
              name_en
            }
            vote_percentage
            votes
            won
          }
        }
      }
      `
    const fetchedData = await fetchData(query)

    const result = {
        ...fetchedData.dc_constituencies[0],
        councillor: fetchedData.dc_constituencies[0].candidates.find(c => c.won)

    }
    return result
}
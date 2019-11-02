import React from 'react'
import AsyncSelect from 'react-select/async'
import { components } from 'react-select'
import * as AddressParser from 'hk-address-parser-lib'
import SearchBoxOption from 'components/molecules/SearchBoxOption'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import { getSingleFeatureFromPoint } from 'utils/features'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_GET_ALL_DISTRICTS } from 'queries/gql'

const GET_PEOPLE = gql`
  query($nameRegex: String) {
    dcd_candidates(
      where: {
        person: {
          _or: [
            { name_zh: { _like: $nameRegex } }
            { name_en: { _ilike: $nameRegex } }
          ]
        }
      }
      limit: 50
      order_by: { person_id: asc, year: desc }
      distinct_on: person_id
    ) {
      person {
        id
        uuid
        name_zh
        name_en
      }
      camp
      year
      constituency {
        code
        name_zh
        name_en
        district {
          dc_name_zh
          dc_name_en
        }
      }
    }
  }
`

const Group = props => (
  <div>
    <components.Group {...props} />
  </div>
)

const SearchAllBox = props => {
  const { client } = props
  const { loading, data, error } = useQuery(QUERY_GET_ALL_DISTRICTS, {
    variables: {
      year: 2019,
    },
    client,
  })

  const getDisctrictNameByCode = code => {
    if (loading || error) {
      return {
        dname_zh: null,
        dname_en: null,
      }
    } else {
      return data.dcd_districts.find(d => d.dc_code === code.charAt(0))
    }
  }

  const searchAddress = async query => {
    const records = await AddressParser.parse(query)
    return records
      .filter((_, index) => index < 10)
      .map(record => {
        let constituency = getSingleFeatureFromPoint(record.coordinate())
        constituency = {
          ...constituency,
          ...getDisctrictNameByCode(constituency.code),
        }
        return {
          coordinate: record.coordinate(),
          constituency,
          label: record.fullAddress(AddressParser.Address.LANG_ZH),
          type: 'address',
        }
      })
      .filter(
        (ele, index, self) =>
          index === self.findIndex(record => record.label === ele.label)
      )
  }

  const searchPeople = async query => {
    const { data } = await client.query({
      query: GET_PEOPLE,
      variables: {
        nameRegex: `%${query}%`,
      },
    })
    data.dcd_candidates.sort((a, b) => b.year - a.year)
    return data.dcd_candidates.map(c => ({
      label: c.person.name_zh || c.person.name_en,
      uuid: c.person.uuid,
      name_zh: c.person.name_zh,
      name_en: c.person.name_en,
      constituency: c.constituency,
      camp: c.camp,
      type: 'people',
    }))
  }

  const search = async query => {
    const results = await Promise.all([
      searchAddress(query),
      searchPeople(query),
    ])
    return [
      {
        label: 'address',
        options: results[0],
      },
      {
        label: 'people',
        options: results[1],
      },
    ]
  }

  return (
    <>
      <AsyncSelect
        components={{
          Option: SearchBoxOption,
          Group,
        }}
        cacheOptions
        loadOptions={search}
        defaultOptions
      />
    </>
  )
}
export default withApollo(SearchAllBox)

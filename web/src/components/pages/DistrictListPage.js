import React from 'react'
import { Query } from 'react-apollo'
import { QUERY_GET_CONSTITUENCIES_BY_TAG } from 'queries/gql'
import ConstituencyCard from 'components/organisms/ConstituencyCard'

const DistrictListPage = props => {
  const {
    match: {
      params: { tag },
    },
  } = props

  return (
    <Query
      query={QUERY_GET_CONSTITUENCIES_BY_TAG}
      variables={{ tag, year: 2019 }}
    >
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error! ${error}`

        return (
          <>
            {data.dcd_constituencies.map(c => (
              <ConstituencyCard key={c.id} constituency={c} />
            ))}
          </>
        )
      }}
    </Query>
  )
}

export default DistrictListPage

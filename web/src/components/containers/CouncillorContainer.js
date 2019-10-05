import React from 'react'
import { Query } from 'react-apollo'
import { QUERY_GET_COUNCILLOR } from 'queries/gql'
import PropTypes from 'prop-types'
import Councillor from 'components/templates/Councillor'

const CouncillorContainer = props => {
  const { code, year } = props

  return (
    <Query query={QUERY_GET_COUNCILLOR} variables={{ code, year }}>
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error! ${error}`

        return (
          <>
            <Councillor councillors={data.dcd_councillors} />
          </>
        )
      }}
    </Query>
  )
}

CouncillorContainer.propsType = {
  cacode: PropTypes.string,
  year: PropTypes.number,
}
export default CouncillorContainer

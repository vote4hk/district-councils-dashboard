import React from 'react'
import { Query } from 'react-apollo'
import { QUERY_GET_PERSON_ELECTIONS } from 'queries/gql'
import PropTypes from 'prop-types'
import PersonElectionHistories from 'components/templates/PersonElectionHistories'

const PersonElectionHistoriesContainer = props => {
  const { personId } = props
  return (
    <Query
      query={QUERY_GET_PERSON_ELECTIONS}
      variables={{ person_id: personId }}
    >
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error! ${error}`

        return (
          <>
            <PersonElectionHistories
              histories={data.dcd_people_by_pk.candidates}
            />
          </>
        )
      }}
    </Query>
  )
}

PersonElectionHistoriesContainer.propsType = {
  personId: PropTypes.int,
}
export default PersonElectionHistoriesContainer

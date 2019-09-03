import React from 'react'
import { Query } from 'react-apollo'
import { QUERY_GET_PERSON_MEETING_ATTENDANCES } from 'queries/gql'
import PropTypes from 'prop-types'
import CouncillorMeetingAttendace from 'components/templates/CouncillorMeetingAttendance'
import _ from 'lodash'

const CouncillorMeetingAttendaceContainer = props => {
  const { personId } = props
  return (
    <Query
      query={QUERY_GET_PERSON_MEETING_ATTENDANCES}
      variables={{ person_id: personId }}
    >
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error! ${error}`

        const meetings = _.flatten(
          data.dcd_councillors.map(c => c.meeting_attendances)
        )
        return (
          <>
            <CouncillorMeetingAttendace meetings={meetings} />
          </>
        )
      }}
    </Query>
  )
}

CouncillorMeetingAttendaceContainer.propsType = {
  personId: PropTypes.int,
}
export default CouncillorMeetingAttendaceContainer

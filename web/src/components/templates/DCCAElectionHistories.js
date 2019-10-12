import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ScrollableTabs from 'components/organisms/ScrollableTabs'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Typography } from '@material-ui/core'
import DCCAElectionResult from 'components/templates/DCCAElectionResult'
import Box from '@material-ui/core/Box'
import { COLORS } from 'ui/theme'
import Divider from '@material-ui/core/Divider'

import { getColorFromCamp } from 'utils/helper'

const GET_DCCA_ELECTION_HISTORIES = gql`
  query($year: Int!, $code: String!) {
    dcd_constituencies(where: { year: { _eq: $year }, code: { _eq: $code } }) {
      code
      name_zh
      candidates {
        person {
          name_zh
          uuid
        }
        candidate_number
        camp
        votes
        vote_percentage
        is_won
        political_affiliation
      }
    }
  }
`
const DCCAElectionResultContainer = styled(Box)`
  && {
    padding: 0 16px;
  }
`

const StyledTab = styled.div`
  && {
    color: ${props => COLORS.camp[props.camp].background};
  }
`

class DCCAElectionHistories extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { histories } = this.props

    const filteredHistories = histories.filter(
      history => history.year !== '2019'
    )

    return (
      <ScrollableTabs
        titles={filteredHistories.map(history => (
          <Query
            query={GET_DCCA_ELECTION_HISTORIES}
            variables={{ year: history.year, code: history.CACODE }}
          >
            {({ loading, error, data }) => {
              if (loading) return null
              if (error) return `Error! ${error}`

              const electionResult = data.dcd_constituencies[0]

              return (
                <StyledTab
                  camp={getColorFromCamp(
                    electionResult.candidates.find(candi => candi.is_won).camp
                  )}
                >
                  <Typography variant="h6">
                    {electionResult.candidates.find(candi => candi.is_won).camp}
                  </Typography>
                  <Typography variant="h6">{history.year}</Typography>
                  <Typography variant="h6">{electionResult.name_zh}</Typography>
                </StyledTab>
              )
            }}
          </Query>
        ))}
      >
        {filteredHistories.map(history => (
          <Query
            query={GET_DCCA_ELECTION_HISTORIES}
            variables={{ year: history.year, code: history.CACODE }}
          >
            {({ loading, error, data }) => {
              if (loading) return null
              if (error) return `Error! ${error}`

              const electionResult = data.dcd_constituencies[0]

              return (
                <DCCAElectionResultContainer>
                  <DCCAElectionResult candidates={electionResult.candidates} />
                </DCCAElectionResultContainer>
              )
            }}
          </Query>
        ))}
      </ScrollableTabs>
    )
  }
}

export default DCCAElectionHistories

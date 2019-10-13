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
      year
      name_zh
      candidates(where: { year: { _eq: $year }, cacode: { _eq: $code } }) {
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
const CampText = styled.div`
  && {
    border-bottom: 2px ${props => COLORS.camp[props.camp].background} solid;
    margin-bottom: 2px;
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
        tabnumber={
          filteredHistories.length > 0 ? filteredHistories.length - 1 : 0
        }
        indicatorcolor={COLORS.main.primary}
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
                <>
                  <CampText
                    camp={getColorFromCamp(
                      electionResult.candidates.find(candi => candi.is_won).camp
                    )}
                  >
                    {electionResult.candidates.find(candi => candi.is_won).camp}
                  </CampText>
                  <Typography variant="body2">{history.year}</Typography>
                </>
              )
            }}
          </Query>
        ))}
      >
        {filteredHistories.map((history, index) => (
          <Query
            key={index}
            query={GET_DCCA_ELECTION_HISTORIES}
            variables={{ year: history.year, code: history.CACODE }}
          >
            {({ loading, error, data }) => {
              if (loading) return null
              if (error) return `Error! ${error}`

              const electionResult = data.dcd_constituencies[0]

              return (
                <DCCAElectionResultContainer>
                  <DCCAElectionResult electionResult={electionResult} />
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

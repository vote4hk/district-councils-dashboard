import React, { Component } from 'react'
import styled from 'styled-components'
import ScrollableTabs from 'components/organisms/ScrollableTabs'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Typography } from '@material-ui/core'
import DCCAElectionResult from 'components/templates/DCCAElectionResult'
import Box from '@material-ui/core/Box'
import { COLORS } from 'ui/theme'
import { getColorFromCamp } from 'utils/helper'

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

  createQuery(history) {
    const queries = history.map(
      ({ CACODE: code, year }) => `
    dcd_constituencies_${year}_${code}: dcd_constituencies(where: { year: { _eq: $year${year} }, code: { _eq: $code${code} } }) {
      code
      year
      name_zh
      candidates(where: { year: { _eq: $year${year} }, cacode: { _eq: $code${code} } }) {
        person {
          name_en
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
    dcd_candidates_aggregate_${year}_${code}: dcd_candidates_aggregate(
      where: { year: { _eq: $year${year} }, cacode: { _eq: $code${code} } }
    ) {
      aggregate {
        sum {
          votes
        }
      }
    }
`
    )

    const variables = history.reduce((obj, { CACODE: code, year }) => {
      obj[`code${code}`] = code
      obj[`year${year}`] = year
      return obj
    }, {})

    const variableLine = Object.keys(variables).map(
      key => `$${key}: ${key.startsWith('year') ? 'Int' : 'String'}!`
    )

    const query = gql`
  query(${variableLine.join(', ')}) {
    ${queries.join('\n')}
  }`
    return {
      query,
      variables,
    }
  }

  render() {
    const { histories, presetTabIndex } = this.props
    const filteredHistories = histories.filter(
      history => history.year !== '2019'
    )

    const { query, variables } = this.createQuery(filteredHistories)

    return (
      <Query query={query} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error! ${error}`

          const constituencies = []
          const year_vote_sum = {}

          const keys = Object.keys(data)
          for (const key of keys) {
            if (key.includes('dcd_constituencies')) {
              constituencies.push(data[key][0])
            }

            if (key.includes('dcd_candidates_aggregate')) {
              const year = key.split('_')[3]
              year_vote_sum[year] = data[key].aggregate.sum
            }
          }

          return (
            <ScrollableTabs
              tabnumber={
                presetTabIndex < 0
                  ? filteredHistories.length > 0
                    ? filteredHistories.length - 1
                    : 0
                  : presetTabIndex
              }
              indicatorcolor={COLORS.main.primary}
              variant="fullWidth"
              titles={constituencies.map(electionResult => {
                return (
                  <React.Fragment key={electionResult.year}>
                    <CampText
                      camp={getColorFromCamp(
                        electionResult.candidates.find(candi => candi.is_won)
                          .camp
                      )}
                    >
                      {
                        electionResult.candidates.find(candi => candi.is_won)
                          .camp
                      }
                    </CampText>
                    <Typography variant="body2">
                      {electionResult.year}
                    </Typography>
                  </React.Fragment>
                )
              })}
            >
              {constituencies.map(electionResult => {
                electionResult.vote_sum =
                  year_vote_sum[electionResult.year].votes
                return (
                  <DCCAElectionResultContainer key={electionResult.year}>
                    <DCCAElectionResult electionResult={electionResult} />
                  </DCCAElectionResultContainer>
                )
              })}
            </ScrollableTabs>
          )
        }}
      </Query>
    )
  }
}

export default DCCAElectionHistories

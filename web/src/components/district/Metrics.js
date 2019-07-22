import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import * as _ from 'lodash'
import VoterTurnoutChart from './VoterTurnoutChart'

const QUERY_FETCH_VOTES = gql`
  query($year: Int!, $code: String!) {
    dc_constituencies(where: { year: { _eq: 2015 }, code: { _eq: "A01" } }) {
      candidates_aggregate {
        aggregate {
          sum {
            votes
          }
        }
      }
      vote_stats {
        station_code
        name_en
        name_zh
        votes {
          votes
          age
          gender
        }
      }
    }
  }
`
const Container = styled.div`
   {
    padding: 0px 15px 100px 25px;
  }
`

class MainAreas extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    district: PropTypes.object.isRequired,
  }

  render() {
    const {
      year,
      code,
      district: { expected_population },
    } = this.props
    return (
      <Query query={QUERY_FETCH_VOTES} variables={{ year, code }}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error! ${error}`

          const stats = data.dc_constituencies[0].vote_stats

          const barVote = { data: {} }
          barVote.total = stats.reduce((acc, cur) => {
            const sub_total = cur.votes.reduce((acc, cur) => {
              if (typeof barVote.data[cur.age] === 'undefined') {
                barVote.data[cur.age] = {}
              }

              if (typeof barVote.data[cur.age][cur.gender] === 'undefined') {
                barVote.data[cur.age][cur.gender] = 0
              }

              barVote.data[cur.age][cur.gender] += cur.votes

              return acc + cur.votes
            }, 0)
            return acc + sub_total
          }, 0)

          return (
            <Container>
              <Typography variant="h4">人口資料</Typography>
              <Typography variant="h4">{expected_population}</Typography>
              <VoterTurnoutChart
                id={`${year}_${code}_voter_turnout`}
                data={barVote}
              />
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default MainAreas

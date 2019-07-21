import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import AnimatedPieSVG from './AnimatedPieSVG'
import * as _ from 'lodash'

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
    console.log(expected_population)
    return (
      <Query query={QUERY_FETCH_VOTES} variables={{ year, code }}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error! ${error}`

          const stats = data.dc_constituencies[0].vote_stats
          let pieData = {}
          stats.forEach(stat => {
            stat.votes.forEach(vote => {
              pieData[vote.gender + '_' + vote.age] =
                pieData[vote] || 0 + vote.votes
            })
          })
          console.log(stats)
          pieData = Object.keys(pieData).map(key => {
            return {
              value: pieData[key],
            }
          })
          return (
            <Container>
              <Typography variant="h4">人口資料</Typography>
              <Typography variant="h4">{expected_population}</Typography>
              <AnimatedPieSVG
                data={pieData}
                width={200}
                height={200}
                innerRadius={60}
                outerRadius={100}
              />
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default MainAreas

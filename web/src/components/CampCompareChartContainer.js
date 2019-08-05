import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { PropTypes } from 'prop-types'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import _ from 'lodash'

const Container = styled.div`
  && {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`

const DistrictContainer = styled(Button)`
  && {
    width: 120px;
    justify-content: left;
  }
`

const FETCH_CAMP_DATA = gql`
  query fetch_camp_data($year: Int!) {
    dc_candidates(where: { is_won: { _eq: true }, year: { _eq: $year } }) {
      cacode
      camp
      person {
        name_zh
      }
    }
  }
`

function groupDataByRegionAndCamp(candidates) {
  const byCodes = _.groupBy(candidates, candidate => candidate.cacode[0])
  return Object.keys(byCodes).map(code => ({
    code,
    count: byCodes[code]
      .map(r => ({ [r.camp]: 1 }))
      .reduce((p, c) => {
        const val = Object.assign(p)
        Object.keys(c).forEach(k => (val[k] = c[k] + (val[k] ? val[k] : 0)))
        return val
      }, {}),
  }))
}

const CampCompareChartContainer = props => {
  return (
    <Query query={FETCH_CAMP_DATA} variables={{ year: 2015 }}>
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error! ${error}`
        const dataFroGraph = groupDataByRegionAndCamp(data.dc_candidates)
        console.log(dataFroGraph)
        return <Container></Container>
      }}
    </Query>
  )
}
export default CampCompareChartContainer

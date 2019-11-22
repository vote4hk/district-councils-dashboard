import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DistrictTurnoutChart from 'components/atoms/charts/DistrictTurnoutChart'
import _ from 'lodash'
import { Grid } from '@material-ui/core'
const PERIOD_COUNT = 15

// returning format:
/*
  {
    Total: [0.0, 0.0, 0.0, null],
    A01: [0.0, 0.0, 0.0, 0.0, ]
  }
*/
const mapData = (turnouts, voters) => {
  const result = {
    total: _.times(PERIOD_COUNT, _.constant(0)),
  }
  const votersByDistrict = {
    total: 0.0,
  }
  let totalVoters = 0.0

  voters.forEach(c => {
    const count = _.get(c, 'vote_stats_aggregate.aggregate.sum.count', 0)
    if (count === 0) {
      console.error(`invalid data for ${c.code}`)
    }
    votersByDistrict[c.code] = count
    totalVoters += count
  })

  Object.keys(turnouts).forEach(code => {
    const total = votersByDistrict[code]
    const turnout =
      turnouts[code].cumulative_turnout || _.times(PERIOD_COUNT, 0)
    result[code] = turnout.map(t => (t === null ? null : t / total))
    result.total = result.total.map((v, i) => (turnout[i] ? v + turnout[i] : v))
  })

  result.total = result.total.map(t => (t === 0 ? null : t / totalVoters))

  return result
}

const DistrictTurnoutChartContainer = props => {
  const [turnoutsData, setTurnoutsData] = useState([])
  const [votersData, setVotersData] = useState([])
  const loading = turnoutsData.length > 0 && votersData.length > 0

  useEffect(() => {
    async function fetchData() {
      const result = await axios(process.env.REACT_APP_TURNOUT_URI)
      if (result.status === 200) {
        setTurnoutsData(result.data)
      }
    }
    async function fetchVoters() {
      const result = await axios('/static/data/voters.json')
      if (result.status === 200) {
        setVotersData(_.get(result, 'data.data.dcd_constituencies', []))
      }
    }
    fetchData()
    fetchVoters()
  }, [])

  return (
    <Grid container spacing={3}>
      {!loading && (
        <DistrictTurnoutChart data={mapData(turnoutsData, votersData)} />
      )}
    </Grid>
  )
}

export default DistrictTurnoutChartContainer

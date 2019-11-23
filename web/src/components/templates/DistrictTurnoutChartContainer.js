import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DistrictTurnoutChart from 'components/atoms/charts/DistrictTurnoutChart'
import _ from 'lodash'
import { Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const PERIOD_COUNT = 15

const Title = styled(Typography)`
  && {
    margin-left: 16px;
    margin-top: 8px;
    margin-bottom: 20px;
  }
`

const mapData = (turnouts, voters, cacode) => {
  const final = {
    constituency: _.times(PERIOD_COUNT, _.constant(null)),
    district: _.times(PERIOD_COUNT, _.constant(null)),
    total: _.times(PERIOD_COUNT, _.constant(null)),
  }

  const votersByDistrict = {
    total: 0.0,
  }
  let totalVoters = 0.0
  let districtVoters = 0.0

  voters.forEach(c => {
    const count = _.get(c, 'vote_stats_aggregate.aggregate.sum.count', 0)
    if (count === 0) {
      console.error(`invalid data for ${c.code}`)
    }
    votersByDistrict[c.code] = count
    totalVoters += count
    if (c.code.charCodeAt(0) === cacode.charCodeAt(0)) {
      districtVoters += count
    }
  })

  Object.keys(turnouts).forEach(code => {
    const total = votersByDistrict[code]
    const turnout = turnouts[code].cumulativeTurnout || _.times(PERIOD_COUNT, 0)

    if (code === cacode) {
      final.constituency = turnout.map(t => (t === null ? null : t / total))
    }

    if (code.charCodeAt(0) === cacode.charCodeAt(0)) {
      final.district = final.district.map((v, i) =>
        turnout[i] ? v + turnout[i] : v
      )
    }

    final.total = final.total.map((v, i) => (turnout[i] ? v + turnout[i] : v))
  })

  final.district = final.district.map(t =>
    t < 0.0001 ? null : t / districtVoters
  )
  final.total = final.total.map(t => (t < 0.0001 ? null : t / totalVoters))

  return final
}

const DistrictTurnoutChartContainer = props => {
  const { code, cname, dname } = props
  const { t } = useTranslation()
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
    <>
      <Title variant="h6">{t('turnont_chart.title')}</Title>
      <Grid container spacing={3}>
        {!loading && (
          <DistrictTurnoutChart
            data={mapData(turnoutsData, votersData, code)}
            labels={{
              constituency: cname,
              district: dname,
              total: t('turnout_chart.HK_turnout_rate'),
            }}
          />
        )}
      </Grid>
    </>
  )
}

DistrictTurnoutChartContainer.propsType = {
  code: PropTypes.string,
  dname: PropTypes.string,
  cname: PropTypes.string,
}

export default DistrictTurnoutChartContainer

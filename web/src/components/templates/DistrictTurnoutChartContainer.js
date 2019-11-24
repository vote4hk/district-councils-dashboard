import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DistrictTurnoutChart from 'components/atoms/charts/DistrictTurnoutChart'
import _ from 'lodash'
import { Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import * as moment from 'moment'

const PERIOD_COUNT = 15
const QUERY_FETCH_GOV_TURNOUT = gql`
  query {
    dcd_config_by_pk(key: "gov_turnout_rate") {
      value
    }
  }
`
const Title = styled(Typography)`
  && {
    margin-left: 16px;
    margin-top: 8px;
    margin-bottom: 20px;
  }
`

const mapData = (turnouts, voters, govData, cacode) => {
  const final = {
    constituency: _.times(PERIOD_COUNT, _.constant(null)),
    district: _.times(PERIOD_COUNT, _.constant(null)),
    total: _.times(PERIOD_COUNT, _.constant(null)),
  }

  const districtCode = cacode[0]

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

  const currentTimeIndex =
    (moment().diff(moment('2019-11-24 08:30')) / (1000 * 60 * 60)) | 0

  Object.keys(turnouts).forEach(code => {
    const total = votersByDistrict[code]
    const turnout = turnouts[code].cumulativeTurnout || _.times(PERIOD_COUNT, 0)

    if (code === cacode) {
      final.constituency = turnout.map((t, i) =>
        t === null || i > currentTimeIndex ? null : t / total
      )

      final.current = _.maxBy(turnout, d => d || 0)
    }

    if (code.charCodeAt(0) === cacode.charCodeAt(0)) {
      final.district = final.district.map((v, i) => v + (turnout[i] || 0))
    }
    final.total = final.total.map((v, i) => v + (turnout[i] || 0))
  })

  let max = 0
  for (let i = 0; i < final.total.length; i++) {
    if (final.total[i] < 0.0001 || i > currentTimeIndex) {
      final.total[i] = null
    } else {
      if (govData.total[i] > final.total[i]) {
        final.total[i] = govData.total[i]
        max = govData.total[i]
      } else {
        final.total[i] = Math.max(max, final.total[i])
        max = final.total[i]
      }

      final.total[i] = final.total[i] / totalVoters
    }
  }

  max = 0
  for (let i = 0; i < final.district.length; i++) {
    if (final.district[i] < 0.0001 || i > currentTimeIndex) {
      final.district[i] = null
    } else {
      if (govData[districtCode][i] > final.district[i]) {
        final.district[i] = govData[districtCode][i]
        max = final.district[i]
      } else {
        final.district[i] = Math.max(max, final.district[i])
        max = final.district[i]
      }

      final.district[i] = final.district[i] / districtVoters
    }
  }

  return final
}

const DistrictTurnoutChartContainer = props => {
  const { code, cname, dname } = props
  const { t } = useTranslation()
  const [turnoutsData, setTurnoutsData] = useState({})
  const [votersData, setVotersData] = useState([])

  const { loading, data } = useQuery(QUERY_FETCH_GOV_TURNOUT)

  const allLoaded =
    !_.isEmpty(turnoutsData) > 0 && votersData.length > 0 && !loading
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
        {allLoaded && (
          <DistrictTurnoutChart
            data={mapData(
              turnoutsData,
              votersData,
              data.dcd_config_by_pk.value,
              code
            )}
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

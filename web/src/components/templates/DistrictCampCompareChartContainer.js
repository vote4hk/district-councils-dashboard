import React, { useEffect } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import _ from 'lodash'
import { DCREGION } from 'constants/dcregion'
import StackedNormalizedHorizontalBarChart from 'components/atoms/charts/StackedNormalizedHorizontalBarChart'
import PredictionChartPanel from 'components/organisms/PredictionChartPanel'
import LoadingButton from 'components/molecules/LoadingButton'
import Text from 'components/atoms/Text'
import axios from 'axios'
import Box from '@material-ui/core/Box'
import { COLORS } from 'ui/theme'
import { fireEvent } from 'utils/ga_fireevent'
import { groupExpectDataByRegionAndCamp } from './CampCompareChartContainer'
import { useTranslation } from 'react-i18next'
import ScrollableTabs from 'components/organisms/ScrollableTabs'

const Container = styled.div`
  && {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 16px 8px;
    p {
      font-size: 12px;
    }
    a {
      text-decoration: unset;
      color: ${COLORS.main.primary};
      font-weight: 500;
    }
  }
`

const PredictionChartHeader = styled(Box)`
  && {
    display: block;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
  }
`

const StyledLoadingButton = styled(LoadingButton)`
  && {
    position: absolute;
    width: auto;
    right: 16px;
    bottom: 0px;
    padding: 0 16px 0;
    background-color: ${COLORS.main.primary};
    color: ${COLORS.main.background};
    :hover {
      color: ${COLORS.main.primary};
      border-color: 1px ${COLORS.main.primary} solid;
    }
  }
`

const FETCH_CAMP_DATA = gql`
  query fetch_camp_data($year: Int!, $dcode: String!) {
    dcd_candidates(
      where: {
        is_won: { _eq: true }
        year: { _eq: $year }
        cacode: { _like: $dcode }
        election_type: { _eq: "ordinary" }
      }
    ) {
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

function convertToD3Compatible(data, sortFunc) {
  const res = {
    data: data
      .map(d => {
        return {
          name: DCREGION[d.code].zh_hk,
          建制: DCREGION[d.code].unelected_dc_seat + (d.count['建制'] || 0), // 當然議員
          民主: d.count['民主'] || 0,
          其他: d.count['其他'] || 0,
          total: Object.values(d.count).reduce((acc, c) => {
            acc += c
            return acc
          }, 0),
        }
      })
      .sort(
        sortFunc
          ? sortFunc
          : (a, b) => b['建制'] / b.total - a['建制'] / a.total
      ), // default sort by established count
    columns: ['name', '建制', '其他', '民主'],
  }
  return res
}

const sortByDefaultChartOrderFunc = defaultChartData => (a, b) => {
  const indexFromOriginalChartData = record => {
    let index = defaultChartData.length
    defaultChartData.data.forEach((v, i) => {
      if (v.name === record.name) {
        index = i
        return i
      }
    })
    return index
  }
  return indexFromOriginalChartData(a) - indexFromOriginalChartData(b)
}

const DistrictCampCompareChartContainer = props => {
  const { className, code } = props
  const [predictEnabled, setPredictEnabled] = React.useState(false)
  const [isLoadingPrediction, setIsLoadingPrediction] = React.useState(true)
  const [predictoinData, setPredictionData] = React.useState({})
  const [settings, setSettings] = React.useState({
    config: {
      auto_won_add_components: true,
      reference_last_election: true,
    },
    camp_rate: [60, 50, 40],
    vote_rate: [40, 40, 40],
  })
  const { t } = useTranslation()
  const titles = ['2019', '2015']
  useEffect(() => {
    async function fetchData() {
      const result = await axios(`/static/data/prediction.json`)
      if (result.status === 200) {
        setPredictionData(result.data.data)
        setIsLoadingPrediction(false)
      }
    }
    fetchData()
  }, [])
  return (
    <ScrollableTabs
      titles={titles}
      indicatorcolor={COLORS.main.primary}
      variant="fullWidth"
    >
      <Query
        query={FETCH_CAMP_DATA}
        variables={{ year: 2019, dcode: `${code}%` }}
      >
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error! ${error}`

          const dataFroGraph = groupDataByRegionAndCamp(data.dcd_candidates)
          const dataForD3 = convertToD3Compatible(dataFroGraph)

          let d3Data = dataForD3

          if (!isLoadingPrediction && predictEnabled) {
            const expectedDataForGraph = groupExpectDataByRegionAndCamp(
              predictoinData.dcd_constituencies,
              settings,
              code
            )
            d3Data = convertToD3Compatible(
              expectedDataForGraph,
              sortByDefaultChartOrderFunc(dataForD3)
            )
          }

          return (
            <Container className={className}>
              <PredictionChartHeader>
                <Text variant="h5">{t('predictionChartHeader.text3')}</Text>
              </PredictionChartHeader>
              <StackedNormalizedHorizontalBarChart
                hideLegend
                data={d3Data}
              ></StackedNormalizedHorizontalBarChart>
            </Container>
          )
        }}
      </Query>
      <Query
        query={FETCH_CAMP_DATA}
        variables={{ year: 2015, dcode: `${code}%` }}
      >
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error! ${error}`

          const dataFroGraph = groupDataByRegionAndCamp(data.dcd_candidates)
          const dataForD3 = convertToD3Compatible(dataFroGraph)

          let d3Data = dataForD3

          return (
            <Container className={className}>
              <PredictionChartHeader>
                <Text variant="h5">{t('predictionChartHeader.text2')}</Text>
              </PredictionChartHeader>
              <StackedNormalizedHorizontalBarChart
                hideLegend
                data={d3Data}
              ></StackedNormalizedHorizontalBarChart>
            </Container>
          )
        }}
      </Query>
    </ScrollableTabs>
  )
}
export default DistrictCampCompareChartContainer

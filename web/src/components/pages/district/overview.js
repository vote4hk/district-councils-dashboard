import React, { useEffect } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Loading } from 'components/atoms/Loading'
import DistrictCampCompareChartContainer from 'components/templates/DistrictCampCompareChartContainer'
import VoteTurnouts from 'components/organisms/VoteTurnouts'
import axios from 'axios'
import DistrictsTable from 'components/molecules/district/DistrictsTable'

const DistrictOverviewPage = props => {
  const {
    match: {
      params: { year, code },
    },
  } = props

  const [turnoutsData, setTurnoutsData] = React.useState({})

  useEffect(() => {
    async function fetchData() {
      const result = await axios(process.env.REACT_APP_TURNOUT_URI)
      if (result.status === 200) {
        setTurnoutsData(result.data)
      }
    }
    fetchData()
  }, [])

  const query = gql`
    query DistrictOverviewQuery($year: Int!, $code: String!) {
      ${DistrictsTable.query}
      ${VoteTurnouts.query}
    }
  `

  const variables = {
    year,
    code,
  }

  const isLive = process.env.REACT_APP_LIVE_VOTE_TURNOUT

  return (
    <Query query={query} variables={variables}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />
        if (error) return `Error! ${error}`
        if (!data) return null

        const mergedData = {
          ...data,
          turnouts: turnoutsData,
          type: 'constituency',
          districtCode: code,
          year,
        }

        return (
          <>
            {isLive === 'false' && (
              <DistrictCampCompareChartContainer code={code} />
            )}
            <DistrictsTable data={mergedData} />
          </>
        )
      }}
    </Query>
  )
}

export default DistrictOverviewPage

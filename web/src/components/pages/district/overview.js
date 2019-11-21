import React, { useEffect } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Loading } from 'components/atoms/Loading'
import DistrictsOverview from 'components/organisms/DistrictsOverview'
// import DistrictCampCompareChartContainer from 'components/templates/DistrictCampCompareChartContainer'
import VoteTurnouts from 'components/organisms/VoteTurnouts'
import axios from 'axios'

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
      ${DistrictsOverview.query}
      ${VoteTurnouts.query}
    }
  `

  const variables = {
    year,
    code,
  }

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
            {/*<DistrictCampCompareChartContainer code={code} /> */}
            <VoteTurnouts data={mergedData} />
            <DistrictsOverview data={mergedData} />
          </>
        )
      }}
    </Query>
  )
}

export default DistrictOverviewPage

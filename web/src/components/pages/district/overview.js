import React from 'react'
import { Query } from 'react-apollo'
import { QUERY_GET_DISTRICT } from 'queries/gql'
import { Loading } from 'components/atoms/Loading'
import DistrictsTable from 'components/molecules/district/DistrictsTable'
import DistrictCampCompareChartContainer from 'components/templates/DistrictCampCompareChartContainer'

const DistrictOverviewPage = props => {
  const {
    match: {
      params: { year, code },
    },
  } = props

  return (
    <Query query={QUERY_GET_DISTRICT} variables={{ code, year }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />
        if (error) return `Error! ${error}`

        const districts = data.dcd_districts

        return (
          <>
            <DistrictCampCompareChartContainer code={code} />
            <DistrictsTable districts={districts} year={year} />
          </>
        )
      }}
    </Query>
  )
}

export default DistrictOverviewPage

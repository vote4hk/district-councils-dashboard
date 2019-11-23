import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import withQuery from 'withQuery'
import { DISTRICT_DATA } from 'queries/gql'
import DistrictsTable from 'components/molecules/district/DistrictsTable'

const DistrictsOverview = props => {
  const { districts, year } = props

  return <DistrictsTable districts={districts} year={year} />
}

DistrictsOverview.propTypes = {
  districts: PropTypes.array.isRequired,
  year: PropTypes.string.isRequired,
}

export default withQuery(
  DistrictsOverview,
  {
    query: `
      dcd_districts( where: { dc_code: { _eq: $code } } ) {
        ${DISTRICT_DATA}
      }
    `,
    variables: { year: 2019 },
  },
  data => ({
    districts: _.get(data, 'dcd_districts', []),
    year: data.year,
  })
)

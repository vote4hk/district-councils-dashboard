import React from 'react'
import PropTypes from 'prop-types'
import {
  getConstituencyTurnouts,
  getDistrictTurnouts,
  withLanguage,
} from 'utils/helper'
import VoteTurnout from 'components/molecules/VoteTurnout'
import withQuery from 'withQuery'
import _ from 'lodash'
import { Grid } from '@material-ui/core'

const VoteTurnouts = props => {
  const { turnouts, type } = props

  return (
    <Grid container spacing={3}>
      {turnouts &&
        turnouts.length > 0 &&
        turnouts.map((t, index) => {
          const key =
            t.type === 'district'
              ? t.dc_code
              : t.type === 'constituency'
              ? t.code
              : 'all'
          const label =
            t.type === 'district'
              ? `${withLanguage(t.dc_name_en, t.dc_name_zh)}`
              : t.type === 'constituency'
              ? `${withLanguage(t.name_en, t.name_zh)} (${t.code})`
              : '全港'
          return (
            <VoteTurnout
              key={key}
              label={label}
              current={t.current}
              percentage={t.percentage}
              updateTime={t.updateTime}
              type={t.type}
            />
          )
        })}
    </Grid>
  )
}

VoteTurnouts.propTypes = {
  turnouts: PropTypes.array,
}

export default withQuery(
  VoteTurnouts,
  {
    query: `
      constituencies: dcd_constituencies(where: { year: { _eq: $year } } ) {
        code
        name_zh
        name_en
        district {
          dc_code
          dc_name_en
          dc_name_zh

        }
        vote_stats {
          count
          type
          subtype
          category_1
          category_2
        }
      }
    `,
    variables: { year: 2019 },
  },
  data => {
    const constituencies = _.get(data, 'constituencies', [])
    const turnouts = _.get(data, 'turnouts', {})
    const districtCode = _.get(data, 'districtCode', null)
    return {
      turnouts:
        data.type === 'district'
          ? getDistrictTurnouts(constituencies, turnouts)
          : getConstituencyTurnouts(constituencies, turnouts, districtCode),
      districtCode: districtCode,
      type: data.type,
    }
  }
)

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
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const VoteTurnoutsContainer = styled.div`
  && {
    width: 100%;
    display: flex;
    flex-direction: column;
    vertical-align: top;
  }
`

const VoteTurnoutsHeader = styled(Typography)`
  && {
    font-size: 18px;
    font-weight: 600;
  }
`

const StyledCircularProgress = styled(CircularProgress)`
  && {
    margin: 0 auto;
  }
`

const StyledExpansionPanel = styled(ExpansionPanel)`
  && {
    width: 100%;
    box-shadow: none;
  }
`

const StyledExpansionPanelSummary = styled(ExpansionPanelSummary)`
  && {
    padding: 0 12px;
    border-bottom: 1px solid #cccccc;
    .Mui-expanded {
      margin: 6px 0;
    }
  }
`

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  && {
    display: flex;
    flex-direction: column;
    padding: 14px 8px;
  }
`

const VoteTurnouts = props => {
  const [expanded, setExpanded] = React.useState('panel1')
  const { turnouts } = props
  const { t } = useTranslation()

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <VoteTurnoutsContainer>
      <StyledExpansionPanel
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        key={`vote-turnouts-panel`}
        TransitionProps={{ unmountOnExit: true }}
      >
        <StyledExpansionPanelSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <VoteTurnoutsHeader>
            {t('turnout_chart.turnout_rate_title')}
          </VoteTurnoutsHeader>
        </StyledExpansionPanelSummary>
        <StyledExpansionPanelDetails>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            spacing={1}
          >
            {turnouts.length === 0 && <StyledCircularProgress />}
            {turnouts &&
              turnouts.length > 0 &&
              turnouts.map((turnout, index) => {
                const key =
                  turnout.type === 'district'
                    ? turnout.dc_code
                    : turnout.type === 'constituency'
                    ? turnout.code
                    : 'all'
                const label =
                  turnout.type === 'district'
                    ? t('turnout_chart.district_turnout_rate', {
                        district: withLanguage(
                          turnout.dc_name_en,
                          turnout.dc_name_zh
                        ),
                      })
                    : turnout.type === 'constituency'
                    ? `${withLanguage(turnout.name_en, turnout.name_zh)} (${
                        turnout.code
                      })`
                    : t('turnout_chart.HK_turnout_rate')
                return (
                  <VoteTurnout
                    key={key}
                    label={label}
                    current={turnout.current}
                    total={turnout.total}
                    percentage={turnout.percentage}
                    updateTime={turnout.updateTime}
                    type={turnout.type}
                    url={turnout.url}
                  />
                )
              })}
          </Grid>
        </StyledExpansionPanelDetails>
      </StyledExpansionPanel>
    </VoteTurnoutsContainer>
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

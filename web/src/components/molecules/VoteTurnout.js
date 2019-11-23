import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress'
import { formatNumber } from 'utils/helper'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'

const colors = {
  constituency: {
    background: '#7b68ee',
    text: 'black',
  },
  district: {
    background: '#7b68ee',
    text: 'black',
  },
  all: {
    background: '#ff574f',
    text: 'black',
  },
}

const VoteGrid = styled(Grid)`
  && {
    cursor: pointer;
  }
`

const VoteLabel = styled(Typography)`
  && {
    font-size: 14px;
  }
`

const VoteText = styled(Typography)`
  && {
    font-size: 14px;
    font-weight: 600 .vote-current {
      font-size: 12px;
    }
    .vote-update-time {
      font-size: 12px;
      color: #cccccc;
    }
  }
`

const VotePercentageBar = styled(LinearProgress)`
  && {
    background: transparent;
    width: 100%;
    height: 12px;
    .MuiLinearProgress-barColorPrimary {
      background-color: ${props => colors[props.type].background};
    }
  }
`

const VoteTurnout = props => {
  const { label, current, percentage, type, updateTime } = props

  const { t } = useTranslation()

  return (
    <Grid container alignItems="center" item xs={12} spacing={3}>
      <VoteGrid item xs={4}>
        <VoteLabel>{label}</VoteLabel>
      </VoteGrid>
      <VoteGrid item xs={8}>
        <VoteText>
          {percentage.toFixed(1)}%
          <span className="vote-current">
            （
            {t('electionResults.votes', {
              n: formatNumber(current),
            })}
            ）
          </span>
          <span className="vote-update-time">{updateTime}</span>
        </VoteText>
        <VotePercentageBar
          variant="determinate"
          type={type}
          value={percentage}
        />
      </VoteGrid>
    </Grid>
  )
}

VoteTurnout.propTypes = {
  label: PropTypes.string,
  current: PropTypes.number,
  percentage: PropTypes.number,
  type: PropTypes.string,
  updateTime: PropTypes.string,
}

export default VoteTurnout

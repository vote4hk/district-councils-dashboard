import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress'
import { formatNumber, getCurrentLanguage } from 'utils/helper'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

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

const VoteText = styled(Typography)`
  && {
    font-size: 14px;
    padding-bottom: 4px;
    .vote-label {
      font-size: 14px;
      padding-right: 10px;
      font-weight: 600;
    }
    .vote-label {
      font-size: 14px;
    }
    .vote-current {
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
    border-bottom: 1px solid #cccccc;
  }
`

const VoteTurnout = props => {
  const { label, current, total, percentage, type, url } = props // updateTime

  const cleanedPercent = percentage > 100 ? 100 : percentage
  const cleanedCurrent = current > total ? total : current

  const { t } = useTranslation()
  const currentLanguage = getCurrentLanguage()

  return (
    <VoteGrid
      item
      xs={12}
      onClick={() => {
        if (url) {
          props.history.push(`/${currentLanguage}/${url}`)
        }
      }}
    >
      <VoteText>
        <span className="vote-label">{label}</span>
        <span className="vote-percent">{cleanedPercent.toFixed(1)}%</span>
        <span className="vote-current">
          （
          {t('electionResults.votes', {
            n: formatNumber(cleanedCurrent),
          })}
          ）
        </span>
        {/* <span className="vote-update-time">{updateTime}</span> */}
      </VoteText>
      <VotePercentageBar
        variant="determinate"
        type={type}
        value={cleanedPercent}
      />
    </VoteGrid>
  )
}

VoteTurnout.propTypes = {
  label: PropTypes.string,
  current: PropTypes.number,
  percentage: PropTypes.number,
  type: PropTypes.string,
  updateTime: PropTypes.string,
}

export default withRouter(VoteTurnout)

import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Tag } from '../atoms/Tag'
import { PeopleAvatar } from '../atoms/Avatar'
import { UnstyledNavLink } from '../atoms/Link'
import Columns from 'components/atoms/Columns'
import Rows from 'components/atoms/Rows'
import LinearProgress from '@material-ui/core/LinearProgress'
import { COLORS } from 'ui/theme'

import {
  getColorFromPoliticalAffiliation,
  getCouncillorMeta,
  getColorFromCamp,
} from 'utils/helper'

const CandiateBox = styled(Box)`
  && {
    display: flex;
    margin: 8px 0 8px;
  }
`

const CandidateAvatar = styled(Columns)`
  && {
    position: relative;
    width: auto;
    margin-right: 16px;
  }
`

const CandidateNumber = styled(Box)`
  && {
    position: absolute;
    top: 40px;
    left: 3px;
    border-radius: 50%;
    font-size: 10px;
    font-weight: 700;
    width: ${props => props.dimension};
    height: ${props => props.dimension};
    background-color: ${props => COLORS.camp[props.camp].background};
    color: ${props => COLORS.camp[props.camp].text};
    text-align: center;
  }
`

const CandidateName = styled(Columns)`
  && {
    width: auto;
    min-width: 120px;
  }
`

const VotePercentageBar = styled(LinearProgress)`
  && {
    background: transparent;
    width: 100%;
    height: 16px;
    .MuiLinearProgress-barColorPrimary {
      background-color: ${props => COLORS.camp[props.camp].background};
    }
  }
`

const DCCAElectionResult = props => {
  const { candidates } = props

  const IMAGE_HOST_URI =
    process.env.REACT_APP_HOST_URI || 'https://hkvoteguide.io'

  const sortedCandidates = candidates.sort((a, b) => b.votes - a.votes)
  return (
    <>
      {sortedCandidates.map(candidate => (
        <CandiateBox>
          <CandidateAvatar>
            <PeopleAvatar
              dimension="60px"
              borderwidth={'3'}
              camp={getColorFromCamp(candidate.camp)}
              src={`${IMAGE_HOST_URI}/static/images/avatar/${candidate.person.uuid}.jpg`}
              imgProps={{
                onError: e => {
                  e.target.src =
                    IMAGE_HOST_URI + '/static/images/avatar/default.png'
                },
              }}
            />
            {candidate.candidate_number > 0 && (
              <CandidateNumber
                dimension="16px"
                camp={getColorFromCamp(candidate.camp)}
              >
                {candidate.candidate_number}
              </CandidateNumber>
            )}
            {/* {candidate.is_won && 'win'} */}
          </CandidateAvatar>
          <CandidateName>
            <Rows>
              <Typography variant="h5">{candidate.person.name_zh}</Typography>
            </Rows>
            <Rows>
              <Typography variant="h6">
                {candidate.political_affiliation} （{candidate.camp}）
              </Typography>
            </Rows>
          </CandidateName>
          <Columns>
            {candidate.votes > 0 ? (
              <>
                <Rows>
                  <Typography variant="h5">
                    {candidate.votes}（{candidate.vote_percentage}%）
                  </Typography>
                </Rows>
                <Rows>
                  <VotePercentageBar
                    // className={classes.margin}
                    variant="determinate"
                    camp={getColorFromCamp(candidate.camp)}
                    value={
                      (candidate.vote_percentage /
                        sortedCandidates[0].vote_percentage) *
                      100
                    }
                  />
                </Rows>
              </>
            ) : (
              <Typography variant="h5">自動當選</Typography>
            )}
          </Columns>
        </CandiateBox>
      ))}
    </>
  )
}

export default DCCAElectionResult

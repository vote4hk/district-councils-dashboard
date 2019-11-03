import React, { useState } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { PeopleAvatar } from '../atoms/Avatar'
import Columns from 'components/atoms/Columns'
import Rows from 'components/atoms/Rows'
import LinearProgress from '@material-ui/core/LinearProgress'
import { COLORS } from 'ui/theme'
import { UnstyledNavLink } from 'components/atoms/Link'

import { formatNumber, getColorFromCamp } from 'utils/helper'

const Container = styled.div`
  && {
    padding-top: 16px;
  }
`
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
    font-weight: 600;
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
    .person-name {
      font-weight: 600;
    }
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

const VoteText = styled(Typography)`
  && {
    font-size: 14px;
    font-weight: 600;
    .vote-percentage {
      font-size: 12px;
    }
  }
`

const DCCAElectionResult = props => {
  const { electionResult } = props

  const IMAGE_HOST_URI =
    process.env.REACT_APP_HOST_URI || 'https://hkvoteguide.io'

  const sortedCandidates = electionResult.candidates.sort(
    (a, b) => b.votes - a.votes
  )

  const [imageLoadError, setImageLoadError] = useState(true)

  return (
    <Container>
      <Typography variant="h6">
        {electionResult.year}年 - {electionResult.name_zh}（
        {electionResult.code}）
      </Typography>
      {sortedCandidates.map((candidate, index) => {
        candidate.vote_percentage = (
          (candidate.votes / electionResult.vote_sum) *
          100
        ).toFixed(1)
        return (
          <UnstyledNavLink
            key={index}
            to={`/profile/${candidate.person.name_zh ||
              candidate.person.name_en}/${candidate.person.uuid}`}
          >
            <CandiateBox>
              <CandidateAvatar>
                <PeopleAvatar
                  dimension="60px"
                  borderwidth={'3'}
                  camp={getColorFromCamp(candidate.camp)}
                  src={`${IMAGE_HOST_URI}/static/images/avatar/${candidate.person.uuid}.jpg`}
                  imgProps={{
                    onError: e => {
                      // wingkwong: avoid infinite callbacks if fallback image fails
                      if (imageLoadError) {
                        setImageLoadError(false)
                        e.target.src =
                          IMAGE_HOST_URI + '/static/images/avatar/default.png'
                      }
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
                  <Typography variant="h5" className="person-name">
                    {candidate.person.name_zh}
                  </Typography>
                </Rows>
                <Rows>
                  <Typography variant="body2">
                    {candidate.political_affiliation} （{candidate.camp}）
                  </Typography>
                </Rows>
              </CandidateName>
              <Columns>
                {candidate.votes > 0 ? (
                  <>
                    <Rows>
                      <VoteText>
                        {formatNumber(candidate.votes)}票{' '}
                        <span className="vote-percentage">
                          （{candidate.vote_percentage}%）
                        </span>
                      </VoteText>
                    </Rows>
                    <Rows>
                      <VotePercentageBar
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
          </UnstyledNavLink>
        )
      })}
    </Container>
  )
}

export default DCCAElectionResult

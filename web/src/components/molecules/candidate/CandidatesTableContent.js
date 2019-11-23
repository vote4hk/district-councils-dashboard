import React, { Component, useState } from 'react'
import { PeopleAvatar } from 'components/atoms/Avatar'
import { withRouter } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import styled from 'styled-components'
import {
  getColorFromCamp,
  getCurrentLanguage,
  withLanguage,
  formatNumber,
} from 'utils/helper'
import { COLORS } from 'ui/theme'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { HtmlTooltip } from 'components/atoms/Tooltip'
import { useTranslation, withTranslation } from 'react-i18next'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

const IMAGE_HOST_URI =
  process.env.REACT_APP_HOST_URI || 'https://hkvoteguide.github.io'

const CandidateNumber = styled(Box)`
  && {
    border-radius: 50%;
    font-weight: 700;
    width: ${props => props.dimension};
    height: ${props => props.dimension};
    background-color: ${props => COLORS.camp[props.camp].background};
    color: ${props => COLORS.camp[props.camp].text};
    text-align: center;
  }
`
const WinIndicator = styled(Box)`
  && {
    position: relative;
    margin-bottom: -18px !important;
    top: -15px;
    right: -28px;
    border-radius: 50%;
    font-weight: 700;
    width: ${props => props.dimension};
    height: ${props => props.dimension};
    background-color: white;
    text-align: center;
    padding-top: 1px;
    padding-left: 0px;
  }
`

const StyledTableCell = styled(TableCell)`
  && {
    padding: 6px 6px 6px 12px;
  }
`

const StyledTableRow = styled(TableRow)`
  && {
    cursor: pointer;
    padding: 0 10px;
    td {
      color: ${props => props.textcolor || 'black'};
    }
  }
`
// const StyledCandidateTags = styled(CandidateTags)`
//   && {
//     display: inline;
//     margin-left: 2px;
//   }
// `

const CandidateGrid = props => {
  const { candidate } = props
  const { t } = useTranslation()
  const [imageLoadError, setImageLoadError] = useState(true)

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={1}
      style={{ minWidth: '140px', flexFlow: 'nowrap' }}
    >
      {candidate.candidate_number > 0 && (
        <Grid item>
          <CandidateNumber
            item
            key={candidate.candidate_number}
            dimension="18px"
            camp={getColorFromCamp(candidate.camp)}
          >
            {candidate.candidate_number}
          </CandidateNumber>
        </Grid>
      )}
      <Grid item>
        <PeopleAvatar
          dimension="40px"
          borderwidth={2}
          camp={getColorFromCamp(candidate.camp)}
          src={`${IMAGE_HOST_URI}/static/images/avatar/100x100/${candidate.person.uuid}.jpg`}
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
          opacity={candidate.nominate_status === 'disqualified' ? 0.1 : 1}
        />
        {candidate.is_won && (
          <WinIndicator
            dimension="24px"
            camp={getColorFromCamp(candidate.camp)}
          >
            <CheckCircleOutlineIcon color="primary" fontSize="small" />
          </WinIndicator>
        )}
      </Grid>
      <Grid item>
        {withLanguage(candidate.person.name_en, candidate.person.name_zh)}
        {candidate.tags.findIndex(
          tag => tag.type === 'camp' && tag.tag === '有爭議'
        ) > -1 && (
          <HtmlTooltip
            disableFocusListener
            disableTouchListener
            // text="侯選人政治立場未明"
            text={t('candidate.noPoliticalAffiliation')}
            placement="bottom"
            size={16}
          />
        )}
        {candidate.nominate_status === 'disqualified' && (
          <>
            <br />
            <span>
              {/* (取消資格) */}
              {t('candidate.nominateStatus.disqualified_bracket')}
            </span>
          </>
        )}
        {candidate.nominate_status === 'suspended' && (
          <>
            <br />
            <span>
              {/* (棄選) */}
              {t('candidate.nominateStatus.suspended_bracket')}
            </span>
          </>
        )}
        {candidate.tags.findIndex(
          tag => tag.type === 'demo_status' && tag.tag === 'planb'
        ) > -1 && (
          <>
            <br />
            <span>{t('candidate.nominateStatus.demo_planb_bracket')}</span>
          </>
        )}
      </Grid>
    </Grid>
  )
}

class CandidatesTableContent extends Component {
  matchCamp(candidate, showDemocracy, showEstablishment, showOthers) {
    if (showDemocracy && candidate.camp === '民主') return true
    if (showEstablishment && candidate.camp === '建制') return true
    if (showOthers && candidate.camp === '其他') return true
    return false
  }

  render() {
    const { props, matchCamp } = this
    const {
      candidates,
      showEstablishment,
      showDemocracy,
      showOthers,
      t,
    } = props
    const currentLanguage = getCurrentLanguage()
    var totVotes = 0
    var c
    for (c of candidates) {
      totVotes += c.votes
    }

    candidates.sort((a, b) => b.votes - a.votes)

    return (
      <>
        {candidates
          .filter(candidate =>
            matchCamp(candidate, showDemocracy, showEstablishment, showOthers)
          )
          .map(candidate => (
            <StyledTableRow
              key={candidate.person.id}
              onClick={() => {
                props.history.push(
                  `/${currentLanguage}/profile/${candidate.person.name_zh ||
                    candidate.person.name_en}/${candidate.person.uuid}`
                )
              }}
              textcolor={
                candidate.nominate_status === 'disqualified' ||
                candidate.nominate_status === 'suspended'
                  ? 'grey'
                  : 'black'
              }
            >
              <StyledTableCell>
                <CandidateGrid
                  key={candidate.person.id}
                  candidate={candidate}
                />
              </StyledTableCell>
              <StyledTableCell>
                {withLanguage(
                  candidate.person.related_organization_en,
                  candidate.person.related_organization_zh
                ) || '-'}
              </StyledTableCell>
              <StyledTableCell>
                {withLanguage(
                  candidate.political_affiliation_en,
                  candidate.political_affiliation_zh
                ) || t('candidate.noPoliticalAffiliation')}
              </StyledTableCell>
              <StyledTableCell>
                {candidate.votes
                  ? formatNumber(candidate.votes) +
                    ' ' +
                    '(' +
                    ((candidate.votes / totVotes) * 100).toFixed(0) +
                    '%)'
                  : '---'}
              </StyledTableCell>
            </StyledTableRow>
          ))}
      </>
    )
  }
}

export default withTranslation()(withRouter(CandidatesTableContent))

import React from 'react'
import { PeopleAvatar } from 'components/atoms/Avatar'
import { withRouter } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import styled from 'styled-components'
import { getColorFromCamp } from 'utils/helper'
import { COLORS } from 'ui/theme'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

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

const StyledTableCell = styled(TableCell)`
  && {
    padding: 6px 12px;
  }
`

const StyledTableRow = styled(TableRow)`
  && {
    cursor: pointer;
    padding: 0 10px;
  }
`

const CandidateGrid = props => {
  const { candidate } = props
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={1}
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
          src={`${IMAGE_HOST_URI}/static/images/avatar/${candidate.person.uuid}.jpg`}
          imgProps={{
            onError: e => {
              e.target.src =
                IMAGE_HOST_URI + '/static/images/avatar/default.png'
            },
          }}
        />
      </Grid>
      <Grid item>{candidate.person.name_zh || candidate.person.name_en}</Grid>
    </Grid>
  )
}

const CandidatesTableContent = props => {
  const { candidates } = props

  return (
    <>
      {candidates.map(candidate => (
        <StyledTableRow
          key={candidate.person.id}
          onClick={() => {
            props.history.push(
              `/profile/${candidate.person.name_zh ||
                candidate.person.name_en}/${candidate.person.uuid}`
            )
          }}
        >
          <StyledTableCell>
            <CandidateGrid key={candidate.person.id} candidate={candidate} />
          </StyledTableCell>
          <StyledTableCell>
            {candidate.person.related_organization || '-'}
          </StyledTableCell>
          <StyledTableCell>
            {candidate.political_affiliation || '-'}
          </StyledTableCell>
          <StyledTableCell></StyledTableCell>
        </StyledTableRow>
      ))}
    </>
  )
}

export default withRouter(CandidatesTableContent)

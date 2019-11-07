import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import CandidatesTableContent from 'components/molecules/candidate/CandidatesTableContent'
import { TableRow, TableCell, Box, Typography } from '@material-ui/core'
import { getConstituencyTagsByCandidateCamps } from 'utils/helper'
import { SecondaryTag } from 'components/atoms/Tag'
import { SeperatedColumns } from 'components/atoms/Columns'

const ConstituencyNameTableRow = styled(TableRow)`
  && {
    cursor: pointer;
  }
`

const StyledSecondaryTag = styled(SecondaryTag)`
  && {
    margin-left: 8px;
  }
`

const TagContainer = styled(Box)`
  && {
  }
`

const ConstituencyTableContent = props => {
  const {
    year,
    constituency,
    showEstablishment,
    showDemocracy,
    showBlank,
    showOthers,
  } = props
  const tags = getConstituencyTagsByCandidateCamps(constituency.candidates)

  return (
    <>
      <ConstituencyNameTableRow
        onClick={() => {
          props.history.push(`/district/${year}/${constituency.code}`)
        }}
      >
        <TableCell colSpan={5}>
          <SeperatedColumns>
            <Typography variant="h6">
              {constituency.name_zh}（{constituency.code}）
            </Typography>
            <TagContainer>
              {tags.length > 0 &&
                tags.map((tag, index) => (
                  <StyledSecondaryTag value={tag} key={index} />
                ))}
            </TagContainer>
          </SeperatedColumns>
        </TableCell>
      </ConstituencyNameTableRow>
      <CandidatesTableContent
        candidates={constituency.candidates}
        year={year}
        showEstablishment={showEstablishment}
        showDemocracy={showDemocracy}
        showBlank={showBlank}
        showOthers={showOthers}
      />
    </>
  )
}

export default withRouter(ConstituencyTableContent)

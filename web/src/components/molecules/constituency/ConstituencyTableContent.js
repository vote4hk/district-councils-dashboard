import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import CandidatesTableContent from 'components/molecules/candidate/CandidatesTableContent'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { Typography } from '@material-ui/core'

const ConstituencyNameTableRow = styled(TableRow)`
  && {
    cursor: pointer;
  }
`

const ConstituencyTableContent = props => {
  const { year, constituency, showEstablishment, showDemocracy, showBlank, showOthers } = props

  return (
    <>
      <ConstituencyNameTableRow
        onClick={() => {
          props.history.push(`/district/${year}/${constituency.code}`)
        }}
      >
        <TableCell colSpan={5}>
          <Typography variant="h6">
            {constituency.name_zh}（{constituency.code}）
          </Typography>
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

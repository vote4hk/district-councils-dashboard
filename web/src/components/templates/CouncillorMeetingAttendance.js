import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'

const MobileTableCell = styled(TableCell)`
  && {
    padding: 8px 10px;
  }
`

const CouncillorMeetingAttendace = props => {
  const { meetings } = props

  return (
    <Table>
      <TableHead>
        <TableRow>
          <MobileTableCell align="left">會議</MobileTableCell>
          <MobileTableCell align="left">性質</MobileTableCell>
          <MobileTableCell align="left">年份</MobileTableCell>
          <MobileTableCell align="left">與席</MobileTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {meetings.map((m, index) => (
          <TableRow key={index}>
            <MobileTableCell component="th" scope="row">
              {m.meeting.meet_name}
            </MobileTableCell>
            <MobileTableCell align="left">
              {m.meeting.meet_type}
            </MobileTableCell>
            <MobileTableCell align="left">
              {m.meeting.meet_year}
            </MobileTableCell>
            <MobileTableCell align="left">
              {m.attended}/{m.total}
            </MobileTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

CouncillorMeetingAttendace.propsType = {
  meetings: PropTypes.array,
}

export default CouncillorMeetingAttendace

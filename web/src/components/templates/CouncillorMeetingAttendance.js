import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const CouncillorMeetingAttendace = props => {
  const { meetings } = props

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">會議</TableCell>
          <TableCell align="left">性質</TableCell>
          <TableCell align="left">年份</TableCell>
          <TableCell align="left">與席</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {meetings.map((m, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {m.meeting.meet_name}
            </TableCell>
            <TableCell align="left">{m.meeting.meet_type}</TableCell>
            <TableCell align="left">{m.meeting.meet_year}</TableCell>
            <TableCell align="left">
              {m.attended}/{m.total}
            </TableCell>
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

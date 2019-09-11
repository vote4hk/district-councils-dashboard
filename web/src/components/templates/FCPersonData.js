//

import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from '@material-ui/core'
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

const FCPersonData = props => {
  const { uuid, fcUuid, name } = props

  const fcUri = `https://hkfactcheck.github.io/person/${fcUuid}/${name}`

  return (
    <>
      <Button
        onClick={() => {
          const win = window.open(fcUri, '_blank')
          win.focus()
        }}
      >
        HK Fact Check
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <MobileTableCell align="left">會議</MobileTableCell>
            <MobileTableCell align="left">性質</MobileTableCell>
            <MobileTableCell align="left">年份</MobileTableCell>
            <MobileTableCell align="left">與席</MobileTableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </>
  )
}

FCPersonData.propsType = {
  uuid: PropTypes.string,
  fcUuid: PropTypes.string,
}

export default FCPersonData

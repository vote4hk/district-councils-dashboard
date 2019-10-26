import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import DistrictTableContent from 'components/molecules/district/DistrictTableContent'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { HtmlTooltip } from 'components/atoms/Tooltip'
import styled from 'styled-components'

const StyledTableCell = styled(TableCell)`
  && {
    padding: 6px 0px 6px 16px;
    :last-child {
      padding: 6px 0px 6px 16px;
    }
  }
`
class DistrictsTable extends Component {
  static propTypes = {
    districts: PropTypes.array.isRequired,
    year: PropTypes.string.isRequired,
  }

  render() {
    const { districts, year } = this.props
    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>候選人</StyledTableCell>
            <StyledTableCell>
              相關組織
              <HtmlTooltip
                disableFocusListener
                disableTouchListener
                text="候選人或議員的所屬政黨或社區組織，來源綜合媒體報道"
                placement="bottom"
                size={20}
              />
            </StyledTableCell>
            <StyledTableCell>
              報稱政治聯繫
              <HtmlTooltip
                disableFocusListener
                disableTouchListener
                text="根據候選人提名表格上所填報的政治聯繫"
                placement="bottom"
                size={20}
              />
            </StyledTableCell>
            {/* <TableCell>得票</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {districts.map(district => (
            <DistrictTableContent
              key={district.dc_code}
              district={district}
              year={year}
            />
          ))}
        </TableBody>
      </Table>
    )
  }
}

export default DistrictsTable

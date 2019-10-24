import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import DistrictTableContent from 'components/molecules/district/DistrictTableContent'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { HtmlTooltip } from 'components/atoms/Tooltip'

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
            <TableCell>候選人</TableCell>
            <TableCell>相關組織</TableCell>
            <TableCell>
              報稱政治聯繫
              <HtmlTooltip
                disableFocusListener
                disableTouchListener
                text="根據候選人提名表格上所填報的政治聯繫"
                placement="bottom"
                fontsize={20}
              />
            </TableCell>
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import DistrictTableContent from 'components/molecules/district/DistrictTableContent'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { debounce } from 'lodash'
import { HtmlTooltip } from 'components/atoms/Tooltip'
import CampSelector from 'components/atoms/CampSelector'
import { Loading } from 'components/atoms/Loading'
import styled from 'styled-components'
import { withTranslation, useTranslation } from 'react-i18next'

const StyledTableCell = styled(TableCell)`
  && {
    padding: 6px 0px 6px 16px;
    :last-child {
      padding: 6px 0px 6px 16px;
    }
  }
`

const StyledLoading = styled(Loading)`
  && {
    height: auto;
    margin: 20px auto;
    transform: scale(0.5);
  }
`

class DistrictsTable extends Component {
  static propTypes = {
    districts: PropTypes.array.isRequired,
    year: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      checked: {
        democracy: true,
        establishment: true,
        others: true,
        blank: true,
      },
      toIndex: 0,
      isLoading: true,
    }
  }

  componentDidMount() {
    const { districts } = this.props

    const addDistrict = index => {
      this.setState({
        toIndex: index,
      })
    }

    const scrollHandler = debounce(event => {
      if (
        window.innerHeight + event.target.scrollTop >=
        event.target.firstChild.clientHeight
      ) {
        let index = this.state.toIndex
        if (index < districts.length) {
          addDistrict(++index)
        } else {
          this.setState({
            isLoading: false,
          })
        }
      }
    }, 200).bind(this)

    addDistrict(1)
    document
      .querySelector('#contentContainer')
      .addEventListener('scroll', scrollHandler)
  }

  handleChange(democracy, establishment, others, blank) {
    const checked = { democracy, establishment, others, blank }
    this.setState({ ...this.state, checked: checked })
  }

  loadDistricts(toIndex) {
    const { districts, year } = this.props
    const { democracy, establishment, others, blank } = this.state.checked
    const districtsArray = districts.filter(
      (district, index) => index <= toIndex
    )
    return districtsArray.map(district => (
      <DistrictTableContent
        showEstablishment={establishment}
        showDemocracy={democracy}
        showOthers={others}
        showBlank={blank}
        key={district.dc_code}
        district={district}
        year={year}
      />
    ))
  }

  render() {
    const { t } = useTranslation()

    return (
      <div>
        <CampSelector onChange={this.handleChange.bind(this)} />
        <Table id="districtsTable" size="small" onScroll={this.handleScroll}>
          <TableHead>
            <TableRow>
              <StyledTableCell>候選人</StyledTableCell>
              <StyledTableCell>
                {/* 相關組織{' '} */}
                {t('relatedOrganizations')}{' '}
                <HtmlTooltip
                  disableFocusListener
                  disableTouchListener
                  // text="候選人或議員的所屬政黨或社區組織，來源綜合媒體報道"
                  text={t('relatedOrganizations.tips')}
                  placement="bottom"
                  size={20}
                />
              </StyledTableCell>
              <StyledTableCell>
                {/* 報稱政治聯繫{' '} */}
                {t('reportedPoliticalAffiliation')}{' '}
                <HtmlTooltip
                  disableFocusListener
                  disableTouchListener
                  // text="根據候選人提名表格上所填報的政治聯繫"
                  text={t('reportedPoliticalAffiliation.tips')}
                  placement="bottom"
                  size={20}
                />
              </StyledTableCell>
              {/* <TableCell>得票</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>{this.loadDistricts(this.state.toIndex)}</TableBody>
        </Table>
        {this.state.isLoading && <StyledLoading />}
      </div>
    )
  }
}

export default withTranslation()(DistrictsTable)

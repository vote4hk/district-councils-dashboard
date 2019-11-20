import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { QUERY_GET_CANDIDATES_BY_IDS } from 'queries/gql'
import ConstituencyTableContent from 'components/molecules/constituency/ConstituencyTableContent'
import CampSelector from 'components/atoms/CampSelector'
import { Loading } from 'components/atoms/Loading'
import { withTranslation } from 'react-i18next'
import localforage from 'localforage'
import { Container, Typography } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
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
    line-height: 1rem;
  }
`

class FavCandidateListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      candidateArr: [],
      checked: {
        democracy: true,
        establishment: true,
        others: true,
        blank: true,
      },
    }

    localforage.getItem('candidate').then(value => {
      this.setState({ candidateArr: value === null ? [] : value })
    })
  }

  handleChange(democracy, establishment, others, blank) {
    const checked = { democracy, establishment, others, blank }
    this.setState({ ...this.state, checked: checked })
  }

  render() {
    const { t } = this.props

    return (
      <Query
        query={QUERY_GET_CANDIDATES_BY_IDS}
        variables={{ person_id: this.state.candidateArr, year: 2019 }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loading />
          if (error) return `Error! ${error}`

          const constituencies = data.dcd_constituencies
          const { democracy, establishment, others, blank } = this.state.checked
          return (
            <div>
              <CampSelector onChange={this.handleChange.bind(this)} />
              <Container>
                <Typography variant="h4">
                  {`${data.dcd_constituencies.length}`}
                  {t('no_of_districts')}
                </Typography>
              </Container>
              <Table id="favConstituencyTable" size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      {/* 候選人 */}
                      {t('candidates')}
                    </StyledTableCell>
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
                <TableBody>
                  {constituencies.map(constituency => {
                    return (
                      <ConstituencyTableContent
                        key={constituency.id}
                        constituency={constituency}
                        year={2019}
                        showEstablishment={establishment}
                        showDemocracy={democracy}
                        showBlank={blank}
                        showOthers={others}
                      />
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withTranslation()(FavCandidateListPage)

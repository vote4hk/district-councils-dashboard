import React from 'react'
import { Query } from 'react-apollo'
import { QUERY_GET_CANDIDATES } from 'queries/gql'
import { PeopleAvatar } from 'components/atoms/Avatar'
import { UnstyledNavLink } from 'components/atoms/Link'
import Rows from 'components/atoms/Rows'
import Columns from 'components/atoms/Columns'
import { HtmlTooltip } from 'components/atoms/Tooltip'
import { Box, Typography, Grid } from '@material-ui/core'
import styled from 'styled-components'
import { getColorFromCamp } from 'utils/helper'
import { COLORS } from 'ui/theme'

const IMAGE_HOST_URI =
  process.env.REACT_APP_HOST_URI || 'https://hkvoteguide.github.io'

const Container = styled(Box)`
  && {
    width: 100%;
    padding: 0 0px 16px;
  }
`

const CandidateList = styled(Grid)`
  && {
  }
`

const CandidateGrid = styled(Grid)`
  && {
    margin-bottom: 8px;
  }
`

const Candidate = styled(Box)`
  && {
    position: relative;
    width: auto;
    text-align: center;
    & > div {
      margin: 0 auto;
    }
  }
`

const CandidateNumber = styled(Box)`
  && {
    position: relative;
    margin-bottom: -18px !important;
    top: -19px;
    left: -28px;
    border-radius: 50%;
    font-weight: 700;
    width: ${props => props.dimension};
    height: ${props => props.dimension};
    background-color: ${props => COLORS.camp[props.camp].background};
    color: ${props => COLORS.camp[props.camp].text};
    text-align: center;
  }
`

const ControversialAlert = styled.div`
  && {
    position: relative;
    margin-bottom: -21px !important;
    top: -21px;
    left: 30px;
  }
`
const CandidateName = styled(Typography)`
  && {
    margin-top: 5px;
    font-weight: 700;
  }
`

const CandidatesContainer = props => {
  const { code, year } = props

  return (
    <Query
      query={QUERY_GET_CANDIDATES}
      variables={{ code, year }} // variables={{ code, year }}
    >
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error! ${error}`

        const candidates =
          data.dcd_candidates &&
          data.dcd_candidates.filter(c => c.election_type === 'ordinary')
        return (
          <Container>
            {candidates.length > 0 && (
              <>
                <Rows>
                  <Columns>
                    <Typography variant="h6" gutterBottom>
                      已接獲提名
                    </Typography>
                  </Columns>
                </Rows>
                <Rows>
                  <Columns>
                    <CandidateList container direction="row">
                      {/* Max 3 columns and always centered */}
                      {candidates.map(candidate => (
                        <CandidateGrid
                          key={candidate.person.id}
                          item
                          xs={
                            candidates.length < 3 ? 12 / candidates.length : 4
                          }
                          sm={
                            candidates.length < 4 ? 12 / candidates.length : 3
                          }
                          md={
                            candidates.length < 6 ? 12 / candidates.length : 2
                          }
                        >
                          <UnstyledNavLink
                            to={`/profile/${candidate.person.name_zh ||
                              candidate.person.name_en}/${
                              candidate.person.uuid
                            }`}
                          >
                            <Candidate>
                              <PeopleAvatar
                                dimension="84px"
                                borderwidth={'4'}
                                camp={getColorFromCamp(candidate.camp)}
                                src={`${IMAGE_HOST_URI}/static/images/avatar/${candidate.person.uuid}.jpg`}
                                imgProps={{
                                  onError: e => {
                                    e.target.src =
                                      IMAGE_HOST_URI +
                                      '/static/images/avatar/default.png'
                                  },
                                }}
                                opacity={
                                  candidate.nominate_status ===
                                    'disqualified' ||
                                  candidate.nominate_status === 'suspended'
                                    ? 0.1
                                    : 1
                                }
                              />
                              {candidate.candidate_number > 0 && (
                                <CandidateNumber
                                  dimension="18px"
                                  camp={getColorFromCamp(candidate.camp)}
                                >
                                  {candidate.candidate_number}
                                </CandidateNumber>
                              )}
                              {candidate.tags.findIndex(
                                tag =>
                                  tag.type === 'camp' && tag.tag === '有爭議'
                              ) > -1 && (
                                <ControversialAlert>
                                  <HtmlTooltip
                                    disableFocusListener
                                    disableTouchListener
                                    text="侯選人立場有爭議"
                                    placement="bottom"
                                    size={21}
                                  />
                                </ControversialAlert>
                              )}
                              <CandidateName variant="h5">
                                {candidate.person.name_zh ||
                                  candidate.person.name_en}
                              </CandidateName>

                              <Typography variant="body2">
                                {candidate.political_affiliation ||
                                  '未報稱政治聯繫'}
                              </Typography>

                              {candidate.nominate_status === 'disqualified' && (
                                <Typography variant="body2">
                                  取消資格
                                </Typography>
                              )}
                              {candidate.nominate_status === 'suspended' && (
                                <Typography variant="body2">
                                  宣布棄選
                                </Typography>
                              )}
                            </Candidate>
                          </UnstyledNavLink>
                        </CandidateGrid>
                      ))}
                    </CandidateList>
                  </Columns>
                </Rows>
              </>
            )}
          </Container>
        )
      }}
    </Query>
  )
}

CandidatesContainer.propsType = {
  // cacode: PropTypes.string,
  // year: PropTypes.number,
}
export default CandidatesContainer

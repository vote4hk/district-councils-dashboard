import React from 'react'
import { Query } from 'react-apollo'
import { QUERY_GET_CANDIDATES } from 'queries/gql'
import { PeopleAvatar } from 'components/atoms/Avatar'
import { UnstyledNavLink } from 'components/atoms/UnstyledLink'
import Rows from 'components/atoms/Rows'
import Columns from 'components/atoms/Columns'
import { Box, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { getColorFromPoliticalAffiliation } from 'utils/helper'
import { COLORS } from 'ui/theme'
import PropTypes from 'prop-types'

const IMAGE_HOST_URI =
  process.env.REACT_APP_HOST_URI || 'https://hkvoteguide.github.io'

const Container = styled(Box)`
  && {
    width: 100%;
    padding: 0 0px 16px;
  }
`

const CandidateList = styled(Box)`
  && {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
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
    position: absolute;
    top: 64px;
    left: 3px;
    border-radius: 50%;
    font-weight: 700;
    width: ${props => props.dimension};
    height: ${props => props.dimension};
    background-color: ${props => COLORS.camp[props.camp]};
    color: white;
    text-align: center;
  }
`

const CandidateName = styled(Typography)`
  && {
    margin-top: 5px;
    font-weight: 700;
  }
`

const AlertBox = styled(Columns)`
  && {
    width: 100%;
    margin-bottom: 8px;
    padding: 4px 16px 1px;
    background-color: #ffd731;
  }
`

const PaddingColumns = styled(Columns)`
  && {
    padding: 0 16px;
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
        return (
          <Container>
            {data.dcd_candidates.length > 0 && (
              <>
                <Rows>
                  <AlertBox>
                    <Typography variant="h6" gutterBottom>
                      10月4日至10月17日期間為選舉提名期。
                    </Typography>
                  </AlertBox>
                  <PaddingColumns>
                    <Typography variant="h6" gutterBottom>
                      候選人
                    </Typography>
                  </PaddingColumns>
                </Rows>
                <Rows>
                  <PaddingColumns>
                    <CandidateList>
                      {data.dcd_candidates.map(candidate => (
                        <UnstyledNavLink
                          key={candidate.person.id}
                          to={`/profile/${candidate.person.name_zh ||
                            candidate.person.name_en}/${candidate.person.uuid}`}
                        >
                          <Candidate>
                            <PeopleAvatar
                              dimension="84px"
                              borderwidth={'4'}
                              camp={getColorFromPoliticalAffiliation(
                                candidate.person.related_organization
                              )}
                              src={`${IMAGE_HOST_URI}/static/images/avatar/${candidate.person.uuid}.jpg`}
                              imgProps={{
                                onError: e => {
                                  e.target.src =
                                    IMAGE_HOST_URI +
                                    '/static/images/avatar/default.png'
                                },
                              }}
                            />
                            {candidate.candidate_number > 0 && (
                              <CandidateNumber
                                dimension="18px"
                                camp={getColorFromPoliticalAffiliation(
                                  candidate.person.related_organization
                                )}
                              >
                                {candidate.candidate_number}
                              </CandidateNumber>
                            )}
                            <CandidateName variant="h5">
                              {candidate.person.name_zh}
                            </CandidateName>

                            <Typography variant="h6">
                              {candidate.political_affiliation}
                            </Typography>
                          </Candidate>
                        </UnstyledNavLink>
                      ))}
                    </CandidateList>
                  </PaddingColumns>
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

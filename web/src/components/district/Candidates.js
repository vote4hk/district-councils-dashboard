import React from 'react'
import { Query } from 'react-apollo'
import { QUERY_GET_CANDIDATES } from 'queries/gql'
import { PeopleAvatar } from 'components/atoms/Avatar'
import Rows from 'components/atoms/Rows'
import Columns from 'components/atoms/Columns'
import { Box, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { getColorFromPoliticalAffiliation } from 'utils/helper'
import PropTypes from 'prop-types'

const IMAGE_HOST_URI =
  process.env.REACT_APP_HOST_URI || 'https://hkvoteguide.github.io'

const Container = styled(Box)`
  && {
    width: 100%;
    padding: 0 16px;
  }
`

const CandidateList = styled(Box)`
  && {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`

const Candidate = styled(Box)`
  && {
    width: auto;
    text-align: center;
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
                  <Columns>
                    <Typography variant="h6" gutterBottom>
                      候選人
                    </Typography>
                  </Columns>
                </Rows>
                <Rows>
                  <Columns>
                    <CandidateList>
                      {data.dcd_candidates.map(candidate => (
                        <Candidate key={candidate.person.id}>
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
                          <Typography variant="h5">
                            {candidate.person.name_zh}
                          </Typography>

                          <Typography variant="h6">
                            {candidate.political_affiliation}
                          </Typography>
                        </Candidate>
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

import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { QUERY_GET_CONSTITUENCIES_BY_TAG } from 'queries/gql'
import ConstituencyCard from 'components/organisms/ConstituencyCard'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

const Container = styled(Paper)`
  && {
    width: 100%;
    padding: 16px;
    box-shadow: none;
  }
`

const DistrictListPage = props => {
  const {
    match: {
      params: { tag },
    },
  } = props

  return (
    <Query
      query={QUERY_GET_CONSTITUENCIES_BY_TAG}
      variables={{ tag, year: 2019 }}
    >
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error! ${error}`

        return (
          <>
            <Container>
              <Typography variant="h4">{`${tag}：${data.dcd_constituencies.length}個選區`}</Typography>
            </Container>
            <Container>
              {data.dcd_constituencies.map(c => (
                <ConstituencyCard key={c.id} constituency={c} />
              ))}
            </Container>
          </>
        )
      }}
    </Query>
  )
}

export default DistrictListPage

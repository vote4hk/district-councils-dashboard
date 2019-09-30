import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { QUERY_GET_DISTRICT } from 'queries/gql'
import ConstituencyCard from 'components/organisms/ConstituencyCard'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { Loading } from 'components/atoms/Loading'

const Container = styled(Paper)`
  && {
    width: 100%;
    padding: 16px;
    box-shadow: none;
  }
`

const DistrictOverviewPage = props => {
  const {
    match: {
      params: { code },
    },
  } = props

  return (
    <Query query={QUERY_GET_DISTRICT} variables={{ code, year: 2019 }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />
        if (error) return `Error! ${error}`

        const district = data.dcd_districts[0]

        return (
          <>
            <Container>
              <Typography variant="h4">{`${district.dc_name_zh}：${district.constituencies.length}個選區`}</Typography>
            </Container>
            <Container>
              {district.constituencies.map(c => (
                <ConstituencyCard key={c.id} constituency={c} />
              ))}
            </Container>
          </>
        )
      }}
    </Query>
  )
}

export default DistrictOverviewPage

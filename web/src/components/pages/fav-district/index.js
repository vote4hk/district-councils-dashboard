import React, { Component } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { QUERY_GET_CONSTITUENCIES_BY_DISTRICT_CODES } from 'queries/gql'
import ConstituencyCard from 'components/organisms/ConstituencyCard'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { Loading } from 'components/atoms/Loading'
import localforage from 'localforage'

const Container = styled(Paper)`
  && {
    width: 100%;
    padding: 16px;
    box-shadow: none;
  }
`

class FavDistrictListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      battlegroundArr: [],
    }

    localforage.getItem('battleground').then(value => {
      this.setState({ battlegroundArr: value === null ? [] : value })
    })
  }

  render() {
    return (
      <Query
        query={QUERY_GET_CONSTITUENCIES_BY_DISTRICT_CODES}
        variables={{ dc: this.state.battlegroundArr, year: 2019 }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loading />
          if (error) return `Error! ${error}`

          return (
            <>
              <Container>
                <Typography variant="h4">{`${data.dcd_constituencies.length}個選區`}</Typography>
              </Container>
              <Container>
                {data.dcd_constituencies.map(c => (
                  <ConstituencyCard key={c.id} year={2019} constituency={c} />
                ))}
              </Container>
            </>
          )
        }}
      </Query>
    )
  }
}

export default FavDistrictListPage

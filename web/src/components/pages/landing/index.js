import React, { useEffect } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Summary from 'components/templates/Summary'
// import CampCompareChartContainer from 'components/templates/CampCompareChartContainer'
import styled from 'styled-components'
import SearchTab from 'components/organisms/SearchTab'
import { withTranslation } from 'react-i18next'
import HeadAlert from './HeadAlert'
import CountdownDate from './CountdownDate'
import CenterText from './CenterText'
import VoteTurnouts from 'components/organisms/VoteTurnouts'
import axios from 'axios'

const Container = styled.div`
  width: 100%;
  padding: 16px;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
  flex-grow: 1;
`
/*
const StyledCampCompareChartContainer = styled(CampCompareChartContainer)`
  && {
    margin-top: 16px;
  }
`
*/

const StyledSearchTab = styled(SearchTab)`
  && {
    padding: 100px;
  }
`

const IndexPage = props => {
  const { t } = props

  const [turnoutsData, setTurnoutsData] = React.useState({})

  useEffect(() => {
    async function fetchData() {
      const result = await axios(process.env.REACT_APP_TURNOUT_URI)
      if (result.status === 200) {
        setTurnoutsData(result.data)
      }
    }
    fetchData()
  }, [])

  const query = gql`
    query LandingPageQuery($alertTextKey: String!, $centerTextKey: String!, $year: Int!) {
      ${CenterText.query}
      ${HeadAlert.query}
      ${VoteTurnouts.query}
    }
  `

  const variables = {
    ...CenterText.variables,
    ...HeadAlert.variables,
    ...VoteTurnouts.variables,
  }

  return (
    <Query query={query} variables={variables}>
      {({ data }) => {
        if (!data) {
          return null
        }

        const mergedData = {
          ...data,
          turnouts: turnoutsData,
          type: 'district',
        }

        return (
          <>
            <HeadAlert data={data} />
            <CountdownDate t={t} />
            <Container>
              <Summary />
              <CenterText data={data} />
              <StyledSearchTab />
              {/*<StyledCampCompareChartContainer />*/}
              <VoteTurnouts data={mergedData} />
            </Container>
          </>
        )
      }}
    </Query>
  )
}

export default withTranslation()(IndexPage)

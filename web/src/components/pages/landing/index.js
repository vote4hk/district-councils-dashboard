import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Summary from 'components/templates/Summary'
import CampCompareChartContainer from 'components/templates/CampCompareChartContainer'
import styled from 'styled-components'
import SearchTab from 'components/organisms/SearchTab'
import { withTranslation } from 'react-i18next'
import HeadAlert from './HeadAlert'
import CountdownDate from './CountdownDate'
import CenterText from './CenterText'

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

const StyledCampCompareChartContainer = styled(CampCompareChartContainer)`
  && {
    margin-top: 16px;
  }
`

const StyledSearchTab = styled(SearchTab)`
  && {
    padding: 100px;
  }
`

class IndexPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      autoCompleteList: [],
    }
  }

  render() {
    const { t } = this.props

    const query = gql`
      query LandingPageQuery($alertTextKey: String!, $centerTextKey: String!) {
        ${CenterText.query}
        ${HeadAlert.query}
      }
    `

    const variables = {
      ...CenterText.variables,
      ...HeadAlert.variables,
    }

    return (
      <Query query={query} variables={variables}>
        {({ data }) => {
          if (!data) {
            return null
          }
          return (
            <>
              <HeadAlert data={data} />
              <CountdownDate t={t} />
              <Container>
                <Summary />
                <CenterText data={data} />
                <StyledSearchTab />
                <StyledCampCompareChartContainer />
              </Container>
            </>
          )
        }}
      </Query>
    )
  }
}

export default withTranslation()(IndexPage)

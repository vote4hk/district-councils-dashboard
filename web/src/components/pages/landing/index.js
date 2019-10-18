import React, { Component } from 'react'
import Summary from 'components/templates/Summary'
import CampCompareChartContainer from 'components/templates/CampCompareChartContainer'
import Countdown from 'components/atoms/Countdown'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { Alert } from 'components/atoms/Alert'
import SearchTab from 'components/organisms/SearchTab'

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

const TopSection = styled(Container)`
  && {
    background-color: #f2f2f3;
  }
`

const StyledCampCompareChartContainer = styled(CampCompareChartContainer)`
  && {
    margin-top: 16px;
  }
`
const CountdownContainer = styled.div`
  && {
    width: 100%;
    margin: 0 auto 16px;
  }
`

const StyledSearchTab = styled(SearchTab)`
  && {
    padding: 100px;
  }
`

const electionDate = 'Nov 24, 2019 07:30:00'
class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      autoCompleteList: [],
    }
  }

  async componentDidMount() {}
  onTabSelected(type) {}

  render() {
    return (
      <>
        <Alert>
          <Typography variant="h6" gutterBottom>
            上屆區選，68人自動當選，今屆罕有出現零「白區」！
          </Typography>
        </Alert>
        <TopSection>
          {Date.parse(new Date(electionDate)) > Date.parse(new Date()) && (
            <CountdownContainer>
              <Typography
                variant="h5"
                style={{ textAlign: 'center' }}
                gutterBottom
              >
                距離投票日
              </Typography>
              <Countdown date={electionDate} />
            </CountdownContainer>
          )}
          <Summary />
          {/* <LandingIcon /> */}
        </TopSection>
        <Container>
          <StyledSearchTab />
          <StyledCampCompareChartContainer />
        </Container>
      </>
    )
  }
}

export default IndexPage

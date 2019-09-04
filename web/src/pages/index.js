import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import CampCompareChartContainer from 'components/containers/CampCompareChartContainer'
import Countdown from 'components/atoms/Countdown'
import styled from 'styled-components'
import { TitleText, SubTitleText } from 'components/atoms/Text'
import { Typography } from '@material-ui/core'

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

const ExpandedRow = styled(Box)`
  && {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
  }
`
const CountdownContainer = styled.div`
&& {
  width: 100%;
  margin: 0 auto 16px;
`

const LandingIcon = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  height: 128px;
  background: url('/static/images/landingIcon.svg') no-repeat;
  background-size: cover;
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
          <LandingIcon />
        </TopSection>
        <Container>
          <ExpandedRow>
            <Typography variant="h5">現屆區議會勢力分布</Typography>
            {/* <SubTitleText>了解更多</SubTitleText> */}
          </ExpandedRow>
          <CampCompareChartContainer />
        </Container>
      </>
    )
  }
}

export default IndexPage

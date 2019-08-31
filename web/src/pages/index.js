import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import CampCompareChartContainer from 'components/CampCompareChartContainer'
import styled from 'styled-components'

import { TitleText, SubTitleText } from 'components/atoms/Text'

const styles = theme => ({})

const StyledDivier = styled(Divider)`
  && {
    background-color: #ececec;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 20px;
  }
`

const Container = styled.div`
  width: 100%;
  padding-top: 30px;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
  padding-left: 16px;
  padding-right: 16px;
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

const LandingIcon = styled.div`
  margin-top: 70px;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  height: 128px;
  background: url('/static/images/landingIcon.svg') no-repeat;
  background-size: cover;
`
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
          <LandingIcon />
        </TopSection>
        <Container>
          <ExpandedRow>
            <TitleText>現屆區議會勢力分布</TitleText>
            <SubTitleText>了解更多</SubTitleText>
          </ExpandedRow>
          <CampCompareChartContainer />
        </Container>
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(IndexPage)

import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import styled from 'styled-components'

import { TitleText, SubTitleText } from 'components/atom/Text'

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

const TabButton = styled(Button)`
  && {
    width: 136px;
    height: 52px;
    border-radius: 2px;
    box-shadow: 1px 1px 6px 1px rgba(51, 51, 51, 0.1);
    background-color: ${props => props.theme.main.backgroundColor};
    text-align: center;

    &:hover {
      text-decoration: none;
    }
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

const NoteHeader = styled(TitleText)`
  && {
    text-align: center;
    width: 100%;
  }
`

const NoteContent = styled(Typography)`
  && {
    width: 100%;
  }
`

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      autoCompleteList: [],
    }
  }

  async componentDidMount() {}

  renderNote() {
    return (
      <>
        <NoteHeader>為什麼你的一票很重要？</NoteHeader>
        <NoteContent>
          除非你有投票權、競選公職權，並且參與政治，否則政府不會回應你的利益。如果自己支持的人當選，即使自己的一票不會影響勝選結果，
        </NoteContent>
      </>
    )
  }

  onTabSelected(type) {}

  renderFooter() {
    return <></>
  }

  render() {
    return (
      <>
        <TopSection>
          <ExpandedRow>
            <TabButton onClick={this.onTabSelected('district')}>
              <Typography variant="h4">找選區</Typography>
            </TabButton>
            <TabButton onClick={this.onTabSelected('people')}>
              <Typography variant="h4">找議員</Typography>
            </TabButton>
          </ExpandedRow>
          <LandingIcon />
        </TopSection>
        <Container>
          <ExpandedRow>
            <TitleText>議會觀測</TitleText>
            <SubTitleText>了解更多</SubTitleText>
          </ExpandedRow>
          <StyledDivier />
          <ExpandedRow>
            <TitleText>熱門議題</TitleText>
            <SubTitleText>所有議題</SubTitleText>
          </ExpandedRow>
          <StyledDivier />
          {this.renderNote()}
          {this.renderFooter()}
        </Container>
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SearchPage)

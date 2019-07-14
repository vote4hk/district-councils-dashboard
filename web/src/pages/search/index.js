import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import Divider from '@material-ui/core/Divider'
import PeopleSearcher from '../../components/PeopleSearcher'
import AddressSearcher from '../../components/AddressSearcher'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import styled from 'styled-components'
import { bps } from 'utils/responsive'
import DistrictSelector from 'components/search/DistrictSelector'

import * as AddressParser from 'hk-address-parser-lib'

const styles = theme => ({})

const StyledDivier = styled(Divider)`
  && {
    background-color: #ececec;
    width: 100%;
  }
`

const Container = styled.div`
  ${bps.up('md')} {
    width: 100%;
  }

  ${bps.up('lg')} {
    width: 1440px;
  }
  padding-top: 50px;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
  padding-left: 32px;
  padding-right: 32px;
  flex-grow: 1;
`

const RowContainer = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }
`

const TabButton = styled(Button)`
  && {
    width: 200px;
    margin-left: 30px;
    margin-right: 30px;
    padding-bottom: 30px;
    text-align: center;
    color: ${props => (props.active ? '#ffd731' : '#c2c2c2')};

    border-bottom: ${props => (props.active ? '1px solid #ffd731' : 'none')};

    &:hover {
      text-decoration: none;
    }
  }
`

const ContentContainer = styled(Box)`
  && {
    margin: 50px;
    width: 50%;
    justify-content: center;
  }
`

class SearchPage extends Component {
  selectedTab

  constructor(props) {
    super(props)
    this.state = {
      autoCompleteList: [],
      selectedTab: 'district',
    }
  }

  async componentDidMount() {}

  async onAddressFieldChanged(evt) {
    const { value } = evt.target
    const records = await AddressParser.parse(value)
    this.setState({
      autoCompleteList: records,
    })
  }

  handlePeopleSelected = result => {
    this.props.history.push(`profile/${result.id}`)
  }

  handleAddressSelected = result => {
    if (!result) return

    const lastest = result.pop()

    /* TODO: 
      Use context (?) to store the Global district result array
      When user select click previous button in district page, 
      the CACODE should follow follow the above result
    */

    this.props.history.push(`district/${lastest.year}/${lastest.CACODE}`)
  }

  renderSearchPeople() {
    return <></>
  }
  onTabSelected(tab) {
    return () => {
      this.setState({
        selectedTab: tab,
      })
    }
  }

  renderSearchDistrict() {
    return (
      <RowContainer>
        <ContentContainer>
          <AddressSearcher handleAddressSelected={this.handleAddressSelected} />
        </ContentContainer>
        <ContentContainer>
          <DistrictSelector />
        </ContentContainer>
      </RowContainer>
    )
  }

  render() {
    const { selectedTab } = this.state
    const isSearchPeople = selectedTab === 'people'
    console.log(selectedTab)
    return (
      <Container>
        <RowContainer>
          <TabButton
            active={!isSearchPeople}
            onClick={this.onTabSelected('district').bind(this)}
          >
            <Typography variant="h2">找選區</Typography>
          </TabButton>
          <TabButton
            active={isSearchPeople}
            onClick={this.onTabSelected('people').bind(this)}
          >
            <Typography variant="h2">找議員</Typography>
          </TabButton>
        </RowContainer>
        <StyledDivier />
        {isSearchPeople
          ? this.renderSearchPeople()
          : this.renderSearchDistrict()}
        {/* <ExpansionPanel
          square
          expanded={expanded === 'panel1'}
          onChange={this.handleChange('panel1').bind(this)}
        >
          <ExpansionPanelSummary>
            <Typography>Search Address</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <AddressSearcher
              handleAddressSelected={this.handleAddressSelected}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === 'panel2'}
          onChange={this.handleChange('panel2').bind(this)}
        >
          <ExpansionPanelSummary>
            <Typography>Search People</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Paper>
              <PeopleSearcher
                handlePeopleSelected={this.handlePeopleSelected}
              />
            </Paper>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          square
          expanded={expanded === 'panel3'}
          onChange={this.handleChange('panel3').bind(this)}
        >
          <ExpansionPanelSummary>
            <Typography> Region</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <DistrictSelector />
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
      </Container>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SearchPage)

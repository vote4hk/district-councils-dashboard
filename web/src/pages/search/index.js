import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import PeopleSearcher from '../../components/PeopleSearcher'
import AddressSearcher from '../../components/AddressSearcher'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import styled from 'styled-components'
import DistrictSelector from 'components/search/DistrictSelector'

import * as AddressParser from 'hk-address-parser-lib'

const styles = theme => ({})

const Container = styled.div`
  width: 800px;
  margin: auto;
`

class SearchPage extends Component {
  expanded = false

  constructor(props) {
    super(props)
    this.state = {
      autoCompleteList: [],
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

  handleChange(panel) {
    return (event, newExpanded) => {
      console.log(this.state)
      this.setState({
        expanded: newExpanded ? panel : false,
      })
    }
  }

  render() {
    const { expanded } = this.state

    return (
      <Container>
        <ExpansionPanel
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
        </ExpansionPanel>
      </Container>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SearchPage)

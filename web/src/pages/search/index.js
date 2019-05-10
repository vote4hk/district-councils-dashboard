import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import createMuiTheme from '../../ui/theme'
import Input from '@material-ui/core/Input'
import PeopleSearcher from '../../components/PeopleSearcher'
import AddressSearcher from '../../components/AddressSearcher'
import { Redirect } from 'react-router'

import electors from '../../data/electors'

import * as AddressParser from 'hk-address-parser-lib';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const theme = createMuiTheme

const styles = theme => ({
  content: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
  search1: {
    position: 'absolute',
    top: '15%',
    width: '50%'
  },
  search2: {
    position: 'absolute',
    top: '15%',
    left: '55%',
    width: '45%'
  }
})

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoCompleteList: []
    }
  }

  async componentDidMount() {

  }

  async onAddressFieldChanged(evt) {
    const { value } = evt.target;
    const records = await AddressParser.parse(value);
    this.setState({
      autoCompleteList: records,
    })
  }

  handlePeopleSelected = result => {
    this.props.history.push(`people/${result.name}`)
  }

  render() {
    const { classes } = this.props
    const { autoCompleteList } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <main className={classes.content}>
        <div className={classes.container}>
      <Input
        defaultValue="Search Address"
        className={classes.search1}
        inputProps={{
          'aria-label': 'Description',
        }}
        onChange={this.onAddressFieldChanged.bind(this)}
      />

      { autoCompleteList.map( (address, index) => (<div key={index}><p>{address.fullAddress()}</p></div>))}
      <PeopleSearcher 
            class={classes.search2}
            handlePeopleSelected={this.handlePeopleSelected}
      />
    </div>

        </main>

      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SearchPage)

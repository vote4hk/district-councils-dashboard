import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import createMuiTheme from '../../ui/theme'
import { getAllFeaturesFromPoint } from '../../utils/features'
import Input from '@material-ui/core/Input';




import dc2003 from '../../data/DCCA_2003'
import dc2007 from '../../data/DCCA_2007'
import dc2011 from '../../data/DCCA_2011'
import dc2015 from '../../data/DCCA_2015'
import dc2019 from '../../data/DCCA_2019'
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
      autoCompleteList: [],
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

      <Input
        placeholder="Search People"
        className={classes.search2}
        inputProps={{
          'aria-label': 'Description',
        }}
      />
      { autoCompleteList.map( (address, index) => (<div key={index}><p>{address.fullAddress()}</p></div>))}
    </div>

        </main>

      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SearchPage)
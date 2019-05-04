import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import createMuiTheme from '../../ui/theme'
import { getAllFeaturesFromPoint } from '../../utils/features'
import Button from '@material-ui/core/Button'

import dc2003 from '../../data/DCCA_2003'
import dc2007 from '../../data/DCCA_2007'
import dc2011 from '../../data/DCCA_2011'
import dc2015 from '../../data/DCCA_2015'
import dc2019 from '../../data/DCCA_2019'
import electors from '../../data/electors'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const theme = createMuiTheme

const styles = theme => ({
  content: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
  yearButton: {
    position: 'absolute',
    width: 100,
    top: '15%'
  }
})

class SearchPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          This is search page
        </main>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SearchPage)
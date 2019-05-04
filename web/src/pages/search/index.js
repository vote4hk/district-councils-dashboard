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
    super(props)
  }

  render() {
    const { classes } = this.props
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
      />

      <Input
        placeholder="Search People"
        className={classes.search2}
        inputProps={{
          'aria-label': 'Description',
        }}
      />
    </div>
        </main>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SearchPage)
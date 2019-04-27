import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import NavBar from './layout/NavBar'
import createMuiTheme from './ui/theme'
import { BrowserRouter as Router, Route } from "react-router-dom"
import mapPage from './pages/map'

import './App.css'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const theme = createMuiTheme

const styles = theme => ({
  root: {
    display: 'flex',
  }
})
class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />
            <NavBar />
            <Route exact path="/map" component={mapPage} />
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App)
import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import NavBar from './layout/NavBar'
import createMuiTheme from './ui/theme'
import { Route, Switch } from "react-router-dom"
import ProfilePage from './pages/profile'

import './App.css'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const theme = createMuiTheme

const styles = theme => ({
  root: {
    display: 'flex',
  },
  // Load app bar information from the theme
  // https://stackoverflow.com/questions/48508449/content-beneath-fixed-appbar
  toolbar: theme.mixins.toolbar
})
class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props
    return (
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />
            <NavBar />
        <main>
        <div className={classes.toolbar} />
        {/* Content will be shifted downwards by the div above. If the div is removed, the content will disappear under the app bar. */}
          <Route path="/profile/:name" component={ProfilePage} />
        </main>
        </MuiThemeProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App)

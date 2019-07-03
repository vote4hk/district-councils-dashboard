import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from './ui/theme'
import NavBar from './layout/NavBar'
import SearchPage from './pages/search'
import ProfilePage from './pages/profile'
import DistrictPage from './pages/district'
import NotfoundPage from './pages/notfound'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import './App.css'

const client = new ApolloClient({
  uri: "https://gql.opencultures.life/graphql"
});

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
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
            <NavBar />
            <main>
              {/* <div className={classes.toolbar} /> */}
              {/* Content will be shifted downwards by the div above. If the div is removed, the content will disappear under the app bar. */}
              <Switch>
                <Route exact path="/" component={SearchPage} />
                <Route path="/profile/:id" component={ProfilePage} />
                <Route path="/district/:year/:code" component={DistrictPage} />
                <Route component={NotfoundPage} />
              </Switch>
            </main>
        </MuiThemeProvider>
      </ApolloProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App)

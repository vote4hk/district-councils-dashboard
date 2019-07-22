import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import NavBar from './components/NavBar'
import SearchPage from './pages/search'
import ProfilePage from './pages/profile'
import DistrictPage from './pages/district'
import BattleGroundPage from './pages/battleground'
import NotfoundPage from './pages/notfound'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import theme from 'ui/theme'
import './App.css'

const client = new ApolloClient({
  uri: 'https://gql.opencultures.life/graphql',
})

const styles = theme => ({
  root: {
    display: 'flex',
  },
  // Load app bar information from the theme
  // https://stackoverflow.com/questions/48508449/content-beneath-fixed-appbar
  toolbar: theme.mixins.toolbar,
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar />
          <main>
            <Switch>
              <Route exact path="/" component={SearchPage} />
              <Route path="/profile/:id" component={ProfilePage} />
              <Route path="/district/2019/:code" component={BattleGroundPage} />
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

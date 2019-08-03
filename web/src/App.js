import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { ThemeProvider } from 'styled-components/'
import SearchPage from './pages/search'
import ProfilePage from './pages/profile'
import DistrictPage from './pages/district'
import BattleGroundPage from './pages/battleground'
import NotfoundPage from './pages/notfound'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import theme, { styledComponentTheme } from 'ui/theme/main'
import './App.css'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import SearchDrawer from 'components/search/SearchDrawer'
import Drawer from '@material-ui/core/Drawer'
import MobileAppBar from './components/atom/MobileAppBar'
import { makeStyles } from '@material-ui/core/styles'

const client = new ApolloClient({
  uri: 'https://gql.opencultures.life/graphql',
})

const useStyles = makeStyles({
  paper: {
    width: '100%',
  },
})

const ContentContainer = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
  }
`

const Root = styled(Box)`
  && {
    display: flex;
    max-width: 600px;
    margin: auto;
    overflow: hidden;
  }
`

const App = props => {
  const [open, setOpen] = React.useState(true)
  const classes = useStyles()

  const onDrawerOpen = () => {
    setOpen(true)
  }
  const onDrawerClose = () => {
    setOpen(false)
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styledComponentTheme}>
        <MuiThemeProvider theme={theme}>
          <Root>
            <ContentContainer>
              <CssBaseline />
              <MobileAppBar onDrawerOpen={onDrawerOpen} />
              <main>
                <Switch>
                  <Route exact path="/" component={SearchPage} />
                  <Route path="/profile/:id" component={ProfilePage} />
                  <Route
                    path="/district/2019/:code"
                    component={BattleGroundPage}
                  />
                  <Route
                    path="/district/:year/:code"
                    component={DistrictPage}
                  />
                  <Route component={NotfoundPage} />
                </Switch>
              </main>
            </ContentContainer>
            <Drawer
              anchor="right"
              open={open}
              variant="persistent"
              classes={{
                paper: classes.paper,
              }}
            >
              <SearchDrawer onDrawerClose={onDrawerClose} />
            </Drawer>
          </Root>
        </MuiThemeProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App

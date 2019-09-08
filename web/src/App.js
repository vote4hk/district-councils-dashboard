import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { ThemeProvider } from 'styled-components/'
import IndexPage from './pages'
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
import Drawer from '@material-ui/core/Drawer'
import MobileAppBar from './components/organisms/MobileAppBar'
import Footer from './components/organisms/Footer'
import drawerReducer from 'reducers/drawer'
import ContextStore, { drawerInitialState } from 'ContextStore'
import withTracker from './WithTracker'
import DistrictListPage from 'components/pages/DistrictListPage'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
})

const Root = styled(Box)`
  && {
    height: 100%;
    display: flex;
    margin: auto;
    overflow: hidden;
    background-color: white;
  }
`

const ContentContainer = styled(Box)`
  && {
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1024px;
    margin: auto;
    overflow: auto;
  }
`

const Wrapper = styled(Box)`
  && {
    flex: 1;
  }
`

const App = props => {
  if (!process.env.REACT_APP_GRAPHQL_URI) {
    throw new Error('Graphql host not yet set')
  }

  const [drawerState, drawerDispatch] = React.useReducer(
    drawerReducer,
    drawerInitialState
  )

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styledComponentTheme}>
        <MuiThemeProvider theme={theme}>
          <ContextStore.Provider
            value={{
              drawer: {
                state: drawerState,
                dispatch: drawerDispatch,
              },
            }}
          >
            <Root>
              <ContentContainer>
                <CssBaseline />
                <Wrapper>
                  <MobileAppBar />
                  <main>
                    <Switch>
                      <Route
                        exact
                        path="/"
                        component={withTracker(IndexPage)}
                      />
                      <Route
                        path="/profile/:name/:uuid"
                        component={withTracker(ProfilePage)}
                      />
                      <Route
                        path="/district/2019/tags/:tag"
                        component={withTracker(DistrictListPage)}
                      />
                      <Route
                        path="/district/2019/:code"
                        component={withTracker(BattleGroundPage)}
                      />
                      <Route
                        path="/district/:year/:code"
                        component={withTracker(DistrictPage)}
                      />

                      <Route component={withTracker(NotfoundPage)} />
                    </Switch>
                  </main>
                </Wrapper>
                <Footer />
              </ContentContainer>
              <Drawer
                anchor="left"
                open={drawerState.open}
                variant="persistent"
              >
                <SearchPage />
              </Drawer>
            </Root>
          </ContextStore.Provider>
        </MuiThemeProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App

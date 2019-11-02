import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import IndexPage from 'components/pages/landing'
import ProfilePage from 'components/pages/profile'
import DistrictPage from 'components/pages/district'
import DistrictListPage from 'components/pages/district/list'
import BattleGroundPage from 'components/pages/battleground'
import DisclaimerPage from 'components/pages/disclaimer'
import AboutDCPage from 'components/pages/about/dc'
import NotfoundPage from 'components/pages/notfound'
import SupportUsPage from 'components/pages/support-us'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import theme from 'ui/theme'
import './App.css'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import MobileAppBar from 'components/organisms/MobileAppBar'
import Footer from 'components/organisms/Footer'
import { ContextStoreProvider } from 'ContextStore'
import withTracker from './WithTracker'
import SearchDrawer from 'components/pages/SearchDrawer'
import DistrictOverviewPage from 'components/pages/district/overview'
import DistrictAllPage from 'components/pages/district/all'

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
    overflow: auto;
  }
`

const Wrapper = styled(Box)`
  && {
    flex: 1;
    width: 100%;
    max-width: 1024px;
    margin: auto;
  }
`

const App = props => {
  if (!process.env.REACT_APP_GRAPHQL_URI) {
    throw new Error('Graphql host not yet set')
  }

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <ContextStoreProvider>
          <Root>
            <ContentContainer>
              <CssBaseline />
              <Wrapper>
                <MobileAppBar />
                <main>
                  <Switch>
                    <Route exact path="/" component={withTracker(IndexPage)} />
                    <Route
                      path="/profile/:name/:uuid"
                      component={withTracker(ProfilePage)}
                    />
                    <Route
                      path="/district/:year/tags/:tag"
                      component={withTracker(DistrictListPage)}
                    />
                    <Route
                      path="/district/:year/:code(\w{1})"
                      component={withTracker(DistrictOverviewPage)}
                    />
                    <Route
                      path="/district/2019/:code"
                      component={withTracker(BattleGroundPage)}
                    />
                    <Route
                      path="/district/:year/:code"
                      component={withTracker(DistrictPage)}
                    />
                    <Route
                      path="/district/:year"
                      component={withTracker(DistrictAllPage)}
                    />
                    <Route
                      path="/disclaimer"
                      component={withTracker(DisclaimerPage)}
                    />
                    <Route
                      path="/about-dc"
                      component={withTracker(AboutDCPage)}
                    />
                    <Route
                      path="/about-us"
                      component={withTracker(SupportUsPage)}
                    />
                    <Route component={withTracker(NotfoundPage)} />
                  </Switch>
                </main>
              </Wrapper>
              <Footer />
            </ContentContainer>
            <SearchDrawer />
          </Root>
        </ContextStoreProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  )
}

export default App

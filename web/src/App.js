import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles/'
import IndexPage from 'components/pages/landing'
import ProfilePage from 'components/pages/profile'
import DistrictPage from 'components/pages/district'
import DistrictListPage from 'components/pages/district/list'
import BattleGroundPage from 'components/pages/battleground'
import DisclaimerPage from 'components/pages/disclaimer'
import AboutDCPage from 'components/pages/about/dc'
import NotfoundPage from 'components/pages/notfound'
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
import GlobalDisclaimer from 'components/organisms/GlobalDisclaimer'
import i18n from 'i18n'

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

const LangSwitch = props => {
  const { path, url } = useRouteMatch()
  if (url !== '/') {
    i18n.changeLanguage(url.replace('/', ''))
  }

  return (
    <Switch>
      <Route exact path={path} component={withTracker(IndexPage)} />
      <Route
        path={`${path}/profile/:name/:uuid`}
        component={withTracker(ProfilePage)}
      />
      <Route
        path={`${path}/district/:year/tags/:tag`}
        component={withTracker(DistrictListPage)}
      />
      <Route
        path={`${path}/district/:year/:code(\\w{1})`}
        component={withTracker(DistrictOverviewPage)}
      />
      <Route
        path={`${path}/district/2019/:code`}
        component={withTracker(BattleGroundPage)}
      />
      <Route
        path={`${path}/district/:year/:code`}
        component={withTracker(DistrictPage)}
      />
      <Route
        path={`${path}/district/:year`}
        component={withTracker(DistrictAllPage)}
      />
      <Route
        path={`${path}/disclaimer`}
        component={withTracker(DisclaimerPage)}
      />
      <Route path={`${path}/about-dc`} component={withTracker(AboutDCPage)} />
      <Route component={withTracker(NotfoundPage)} />
    </Switch>
  )
}

const App = props => {
  if (!process.env.REACT_APP_GRAPHQL_URI) {
    throw new Error('Graphql host not yet set')
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ContextStoreProvider>
          <Root>
            <ContentContainer id="contentContainer">
              <CssBaseline />
              <Wrapper>
                <MobileAppBar />
                <GlobalDisclaimer />
                <main>
                  <Switch>
                    <Route path="/(en|zh)?">
                      <LangSwitch />
                    </Route>
                  </Switch>
                </main>
              </Wrapper>
              <Footer />
            </ContentContainer>
            <SearchDrawer />
          </Root>
        </ContextStoreProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App

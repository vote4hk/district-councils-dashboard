import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles/'
import loadable from '@loadable/component'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import theme from 'ui/theme'
import './App.css'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import { ContextStoreProvider } from 'ContextStore'
import withTracker from './WithTracker'
import i18n from 'i18n'
import { fireEvent } from 'utils/ga_fireevent'

const IndexPage = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/pages/landing')
)
const ProfilePage = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/pages/profile')
)
const DistrictPage = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/pages/district')
)
const DistrictListPage = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/pages/district/list')
)
const BattleGroundPage = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/pages/battleground')
)
const DisclaimerPage = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/pages/disclaimer')
)
const AboutDCPage = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/pages/about/dc')
)
const NotfoundPage = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/pages/notfound')
)
const SupportUsPage = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/pages/support-us')
)
const DistrictOverviewPage = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/pages/district/overview')
)
const DistrictAllPage = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/pages/district/all')
)

const MobileAppBar = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/organisms/MobileAppBar')
)
const Footer = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/organisms/Footer')
)
const SearchDrawer = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/pages/SearchDrawer')
)
const GlobalDisclaimer = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/organisms/GlobalDisclaimer')
)

const ShareButton = loadable(() =>
  import(/* webpackPrefetch: true */ 'components/organisms/ShareButton')
)

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
    i18n.changeLanguage(url.replace(/\//g, ''))
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
      <Route path="/about-us" component={withTracker(SupportUsPage)} />
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
              <ShareButton
                onClick={() =>
                  fireEvent({
                    ca: 'general',
                    ac: 'click',
                    lb: 'share_button',
                  })
                }
              />
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

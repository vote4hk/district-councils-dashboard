import { configure, addDecorator } from '@storybook/react'
import Theme from './../src/ui/theme'
import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
})

addDecorator(story => (
  <MuiThemeProvider theme={Theme}>{story()}</MuiThemeProvider>
))

addDecorator(story => (
  <ApolloProvider client={client}>{story()}</ApolloProvider>
))

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module)

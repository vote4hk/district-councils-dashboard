const { ApolloClient } = require('apollo-client')
const { HttpLink } = require('apollo-link-http')
const { InMemoryCache } = require('apollo-cache-inmemory')
require('cross-fetch/polyfill')

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'https://vote4.hk/graphql',
})

const apolloClient = new ApolloClient({ cache, link })

module.exports = apolloClient

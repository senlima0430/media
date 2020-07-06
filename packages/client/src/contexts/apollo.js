import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: `http://${window.location.hostname}:8080/graphql`,
})

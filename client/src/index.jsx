import React from 'react'
import { render } from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

import { App } from './App'
import { AppProvider } from './contexts'

const client = new ApolloClient({
  cache: new InMemoryCache().restore({}),
  link: createUploadLink({ uri: 'http://localhost:8080/graphql' }),
})

render(
  <ApolloProvider client={client}>
    <AppProvider>
      <App />
    </AppProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

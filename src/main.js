import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

import "bootstrap/dist/css/bootstrap.min.css"

const httpLink = createHttpLink({
    uri: 'https://api-gateway-inventario.herokuapp.com',
})
const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})
const apolloProvider = new createApolloProvider({
    defaultClient: apolloClient
})
createApp(App).use(router).use(apolloProvider).mount('#app')
'use client';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
    uri: 'https://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('access_token'); // <- DEIN KEYCLOAK TOKEN
    return {
        headers: {
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

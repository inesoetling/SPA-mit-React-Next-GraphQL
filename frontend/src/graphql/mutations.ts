import { gql } from '@apollo/client';

export const CREATE_BOOK = gql`
    mutation CreateBook($input: BuchInput!) {
        create(input: $input) {
            id
        }
    }
`;

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        token(username: $username, password: $password) {
            access_token
            expires_in
            refresh_token
            refresh_expires_in
        }
    }
`;

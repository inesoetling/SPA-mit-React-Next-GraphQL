import { gql } from '@apollo/client';

export const CREATE_BOOK = gql`
    mutation CreateBook($input: BuchInput!) {
        create(input: $input) {
            id
        }
    }
`;

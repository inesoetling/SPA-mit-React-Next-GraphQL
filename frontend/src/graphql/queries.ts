import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
    query GetBooks($suchparameter: SuchparameterInput) {
        buecher(suchparameter: $suchparameter) {
            id
            isbn
            titel {
                titel
                untertitel
            }
            rating
            art
            preis
            rabatt(short: false)
            lieferbar
            datum
            homepage
            schlagwoerter
        }
    }
`;

export const GET_BOOK_BY_ID = gql`
    query GetBookById($id: ID!) {
        buch(id: $id) {
            id
            isbn
            titel {
                titel
                untertitel
            }
            rating
            art
            preis
            rabatt(short: false)
            lieferbar
            datum
            homepage
            schlagwoerter
        }
    }
`;

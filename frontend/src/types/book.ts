export type BookType = 'EPUB' | 'HARDCOVER' | 'PAPERBACK';

export type Book = {
    id: number;
    isbn: string;
    title: string;
    rating: number;
    type?: BookType;
    price: number;
};

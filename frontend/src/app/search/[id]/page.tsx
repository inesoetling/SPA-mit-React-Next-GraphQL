'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button, Container } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

type BookType = 'HARDCOVER' | 'PAPERBACK' | 'EPUB';

type Book = {
  id: string;
  title: string;
  bookType: BookType;
};

const DUMMY_BOOKS: Book[] = [
  { id: '1', title: 'Modern Web Development', bookType: 'HARDCOVER' },
  { id: '2', title: 'React Patterns and Best Practices', bookType: 'EPUB' },
  { id: '3', title: 'GraphQL in Action', bookType: 'PAPERBACK' },
];

export default function BookDetailsPage() {
  const params = useParams<{ id: string }>();
  const bookId = params.id;

  const book = DUMMY_BOOKS.find((b) => b.id === bookId);

  if (!book) {
    return (
      <Container className="py-4">
        <h1>Book not found</h1>
        <p className="text-muted">No book exists for ID: {bookId}</p>

        <Link href="/search" className="text-decoration-none">
          <Button variant="outline-primary">
            <ArrowLeft className="me-2" />
            Back to Search
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1>{book.title}</h1>
      <p className="text-muted">Type: {book.bookType}</p>

      <Link href="/search" className="text-decoration-none">
        <Button variant="outline-primary">
          <ArrowLeft className="me-2" />
          Back to Search
        </Button>
      </Link>
    </Container>
  );
}

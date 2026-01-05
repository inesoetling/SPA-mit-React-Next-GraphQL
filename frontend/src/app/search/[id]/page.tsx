'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button, Container } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

type BookType = 'HARDCOVER' | 'PAPERBACK' | 'EPUB';

type Book = {
  id: string;
  isbn: string;
  title: string;
  subtitle?: string;
  rating: number;
  bookType: BookType;
  price: number;
  discount?: number;
  available: boolean;
  publicationDate?: string;
};

const DUMMY_BOOKS: Book[] = [
  {
    id: '1',
    isbn: '978-0-123456-78-9',
    title: 'Modern Web Development',
    subtitle: 'A Comprehensive Guide',
    rating: 5,
    bookType: 'HARDCOVER',
    price: 49.99,
    discount: 10,
    available: true,
    publicationDate: '2024-01-15',
  },
  {
    id: '2',
    isbn: '978-0-987654-32-1',
    title: 'React Patterns and Best Practices',
    subtitle: 'Building Scalable Applications',
    rating: 4,
    bookType: 'EPUB',
    price: 29.99,
    available: true,
    publicationDate: '2024-02-01',
  },
  {
    id: '3',
    isbn: '978-0-456789-12-3',
    title: 'GraphQL in Action',
    rating: 4,
    bookType: 'PAPERBACK',
    price: 39.99,
    discount: 15,
    available: false,
    publicationDate: '2023-11-20',
  },
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

  const finalPrice =
    book.discount && book.discount > 0
      ? book.price * (1 - book.discount / 100)
      : book.price;

  const formattedDate = book.publicationDate
    ? new Date(book.publicationDate).toLocaleDateString('de-DE')
    : '-';

  return (
    <Container className="py-4">
      <h1>{book.title}</h1>

      {book.subtitle && <h3 className="text-muted">{book.subtitle}</h3>}

      <p className="mt-3">
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p>
        <strong>Type:</strong> {book.bookType}
      </p>
      <p>
        <strong>Rating:</strong> {book.rating}/5
      </p>
      <p>
        <strong>Publication Date:</strong> {formattedDate}
      </p>
      <p>
        <strong>Price:</strong> €{finalPrice.toFixed(2)}
      </p>
      <p>
        <strong>Status:</strong>{' '}
        {book.available ? 'Available' : 'Not Available'}
      </p>

      <Link href="/search" className="text-decoration-none">
        <Button variant="outline-primary" className="mt-3">
          <ArrowLeft className="me-2" />
          Back to Search
        </Button>
      </Link>
    </Container>
  );
}

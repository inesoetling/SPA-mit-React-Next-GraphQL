'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
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
  return (
    <Container className="py-4">
      <Link
        href="/search"
        className="mb-4 p-0 d-inline-flex align-items-center gap-2 text-decoration-none"
      >
        <ArrowLeft />
        <span>Back to Search</span>
      </Link>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <Row className="g-4">
            <Col lg={8}>
              <h1 className="mb-2">{book.title}</h1>
              {book.subtitle && (
                <h3 className="text-muted mb-3">{book.subtitle}</h3>
              )}

              <p className="text-muted mb-0">
                Book ID: {book.id} • ISBN: {book.isbn}
              </p>
            </Col>

            <Col lg={4}>
              <Card className="bg-light border-0">
                <Card.Body>
                  <h5 className="mb-3">Actions</h5>

                  <Link href="/search" className="text-decoration-none">
                    <Button variant="outline-primary" className="w-100">
                      Back to Search
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import {
  ArrowLeft,
  BoxArrowUpRight,
  Star,
  StarFill,
} from 'react-bootstrap-icons';

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
  homepage?: string;
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
    homepage: 'https://example.com/modern-web',
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

const getBookTypeBadgeVariant = (type: BookType) => {
  switch (type) {
    case 'EPUB':
      return 'primary';
    case 'HARDCOVER':
      return 'success';
    case 'PAPERBACK':
      return 'info';
    default:
      return 'secondary';
  }
};

const renderStars = (rating: number) => {
  const stars = [];

  for (let i = 1; i <= 5; i += 1) {
    if (i <= rating) {
      stars.push(<StarFill key={i} className="text-warning me-1" />);
    } else {
      stars.push(<Star key={i} className="text-secondary me-1" />);
    }
  }

  return <div className="d-flex">{stars}</div>;
};

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
            {/* LEFT CONTENT */}
            <Col lg={8}>
              <div className="mb-4">
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <div>
                    <h1 className="mb-2">{book.title}</h1>
                    {book.subtitle && (
                      <h3 className="text-muted mb-3">{book.subtitle}</h3>
                    )}
                  </div>

                  <Badge bg={getBookTypeBadgeVariant(book.bookType)}>
                    {book.bookType}
                  </Badge>
                </div>

                <div className="d-flex align-items-center gap-3 mb-4">
                  {renderStars(book.rating)}
                  <span className="text-muted">({book.rating}/5)</span>
                </div>
              </div>

              <Row className="g-4 mb-4">
                <Col sm={6}>
                  <Card className="bg-light border-0 h-100">
                    <Card.Body>
                      <h6 className="text-muted mb-2">ISBN</h6>
                      <p className="mb-0">{book.isbn}</p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={6}>
                  <Card className="bg-light border-0 h-100">
                    <Card.Body>
                      <h6 className="text-muted mb-2">Publication Date</h6>
                      <p className="mb-0">{formattedDate}</p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={6}>
                  <Card className="bg-light border-0 h-100">
                    <Card.Body>
                      <h6 className="text-muted mb-2">Price</h6>
                      <div>
                        {book.discount && book.discount > 0 ? (
                          <>
                            <span className="text-decoration-line-through text-muted me-2">
                              €{book.price.toFixed(2)}
                            </span>
                            <span className="fs-5 fw-bold text-success">
                              €{finalPrice.toFixed(2)}
                            </span>
                            <Badge bg="warning" text="dark" className="ms-2">
                              {book.discount}% OFF
                            </Badge>
                          </>
                        ) : (
                          <span className="fs-5 fw-bold">
                            €{book.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={6}>
                  <Card className="bg-light border-0 h-100">
                    <Card.Body>
                      <h6 className="text-muted mb-2">Availability</h6>
                      <Badge
                        bg={book.available ? 'success' : 'danger'}
                        className="fs-6"
                      >
                        {book.available ? 'Available' : 'Not Available'}
                      </Badge>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {book.homepage && (
                <Card className="bg-light border-0 mb-4">
                  <Card.Body>
                    <h6 className="text-muted mb-2">Homepage</h6>
                    <a
                      href={book.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-inline-flex align-items-center gap-2 text-decoration-none"
                    >
                      <span>{book.homepage}</span>
                      <BoxArrowUpRight />
                    </a>
                  </Card.Body>
                </Card>
              )}
            </Col>

            {/* RIGHT ACTIONS */}
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

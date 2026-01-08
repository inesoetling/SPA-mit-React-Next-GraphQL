'use client';

import { GET_BOOK_BY_ID } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import {
  ArrowLeft,
  BoxArrowUpRight,
  PencilSquare,
  Star,
  StarFill,
  Trash,
} from 'react-bootstrap-icons';

type BookType = 'HARDCOVER' | 'PAPERBACK' | 'EPUB';

type Book = {
  id: string;
  isbn: string;
  titel: {
    titel: string;
    untertitel?: string;
  };
  rating: number;
  art: BookType;
  preis: number;
  rabatt?: number;
  lieferbar: boolean;
  datum?: string;
  homepage?: string;
  schlagwoerter?: string[];
  abbildungen?: Array<{
    beschriftung: string;
    contentType: string;
  }>;
};

interface GetBookByIdResponse {
  buch: Book;
}

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

  const { loading, error, data } = useQuery<GetBookByIdResponse>(
    GET_BOOK_BY_ID,
    {
      variables: { id: bookId },
    },
  );

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          Fehler beim Laden des Buchs: {error.message}
        </Alert>
        <Link href="/search" className="text-decoration-none">
          <Button variant="outline-primary">
            <ArrowLeft className="me-2" />
            Back to Search
          </Button>
        </Link>
      </Container>
    );
  }

  const book: Book | undefined = data?.buch;

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
    book.rabatt && book.rabatt > 0
      ? book.preis * (1 - book.rabatt)
      : book.preis;

  const formattedDate = book.datum
    ? new Date(book.datum).toLocaleDateString('de-DE')
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
                    <h1 className="mb-2">{book.titel.titel}</h1>
                    {book.titel.untertitel && (
                      <h3 className="text-muted mb-3">
                        {book.titel.untertitel}
                      </h3>
                    )}
                  </div>

                  <Badge bg={getBookTypeBadgeVariant(book.art)}>
                    {book.art}
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
                        {book.rabatt && book.rabatt > 0 ? (
                          <>
                            <span className="text-decoration-line-through text-muted me-2">
                              €{book.preis.toFixed(2)}
                            </span>
                            <span className="fs-5 fw-bold text-success">
                              €{finalPrice.toFixed(2)}
                            </span>
                            <Badge bg="warning" text="dark" className="ms-2">
                              {(book.rabatt * 100).toFixed(0)}% OFF
                            </Badge>
                          </>
                        ) : (
                          <span className="fs-5 fw-bold">
                            €{book.preis.toFixed(2)}
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
                        bg={book.lieferbar ? 'success' : 'danger'}
                        className="fs-6"
                      >
                        {book.lieferbar ? 'Available' : 'Not Available'}
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

              {book.schlagwoerter && book.schlagwoerter.length > 0 && (
                <Card className="bg-light border-0 mb-4">
                  <Card.Body>
                    <h6 className="text-muted mb-3">Keywords</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {book.schlagwoerter.map((keyword) => (
                        <Badge
                          key={keyword}
                          bg="secondary"
                          className="px-3 py-2"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              )}

              {book.abbildungen && book.abbildungen.length > 0 && (
                <Card className="bg-light border-0">
                  <Card.Body>
                    <h6 className="text-muted mb-3">Images</h6>
                    <div className="d-flex flex-column gap-2">
                      {book.abbildungen.map((img, index) => (
                        <div key={index}>
                          <strong>{img.beschriftung}</strong>
                          <span className="text-muted ms-2">
                            ({img.contentType})
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Col>

            {/* RIGHT ACTIONS */}
            <Col lg={4}>
              <Card
                className="bg-light border-0 sticky-top"
                style={{ top: '20px' }}
              >
                <Card.Body>
                  <h5 className="mb-4">Actions</h5>

                  <div className="d-grid gap-3">
                    <Link href="/search" className="text-decoration-none">
                      <Button
                        variant="outline-primary"
                        className="w-100 d-flex align-items-center justify-content-center gap-2"
                      >
                        <ArrowLeft />
                        <span>Back to Search</span>
                      </Button>
                    </Link>

                    <Button
                      variant="primary"
                      className="d-flex align-items-center justify-content-center gap-2"
                      disabled
                    >
                      <PencilSquare />
                      <span>Edit Book</span>
                    </Button>

                    <Button
                      variant="danger"
                      className="d-flex align-items-center justify-content-center gap-2"
                      disabled
                    >
                      <Trash />
                      <span>Delete Book</span>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

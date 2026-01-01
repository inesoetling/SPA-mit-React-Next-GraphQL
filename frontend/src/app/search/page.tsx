'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Spinner,
} from 'react-bootstrap';
import { Search, Star, StarFill } from 'react-bootstrap-icons';

type BookType = 'HARDCOVER' | 'PAPERBACK' | 'EPUB';
type Availability = 'ALL' | 'AVAILABLE' | 'UNAVAILABLE';

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
  },
  {
    id: '4',
    isbn: '978-0-321654-98-7',
    title: 'TypeScript Mastery',
    subtitle: 'From Beginner to Expert',
    rating: 5,
    bookType: 'HARDCOVER',
    price: 54.99,
    discount: 20,
    available: true,
  },
  {
    id: '5',
    isbn: '978-0-789123-45-6',
    title: 'CSS Grid and Flexbox',
    rating: 3,
    bookType: 'EPUB',
    price: 24.99,
    available: true,
  },
  {
    id: '6',
    isbn: '978-0-159753-84-2',
    title: 'Node.js Backend Development',
    subtitle: 'Server-Side JavaScript',
    rating: 4,
    bookType: 'PAPERBACK',
    price: 44.99,
    discount: 5,
    available: true,
  },
];

export default function SearchPage() {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [bookType, setBookType] = useState<BookType | 'ALL'>('ALL');
  const [availability, setAvailability] = useState<Availability>('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 6;

  const [rating5, setRating5] = useState(false);
  const [rating4, setRating4] = useState(false);
  const [rating3, setRating3] = useState(false);
  const [rating2, setRating2] = useState(false);
  const [rating1, setRating1] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setIsLoading(true);

    // Simuliere eine Ladezeit
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setTitle('');
    setIsbn('');
    setBookType('ALL');
    setAvailability('ALL');
    setRating5(false);
    setRating4(false);
    setRating3(false);
    setRating2(false);
    setRating1(false);
    setIsLoading(false);
    setCurrentPage(1);
  };

  const ratingsSelected = [
    rating5 ? 5 : null,
    rating4 ? 4 : null,
    rating3 ? 3 : null,
    rating2 ? 2 : null,
    rating1 ? 1 : null,
  ].filter((r): r is number => r !== null);

  // Sterne anzeigen
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarFill key={i} className="text-warning" />);
      } else {
        stars.push(<Star key={i} className="text-warning" />);
      }
    }
    return stars;
  };

  // Badge-Farbe für BookType
  const getBookTypeBadge = (type: BookType) => {
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

  const filteredBooks = DUMMY_BOOKS.filter((book) => {
    if (
      title.trim() &&
      !book.title.toLowerCase().includes(title.trim().toLowerCase())
    ) {
      return false;
    }

    if (isbn.trim() && !book.isbn.includes(isbn.trim())) {
      return false;
    }

    if (bookType !== 'ALL' && book.bookType !== bookType) {
      return false;
    }

    if (availability === 'AVAILABLE' && !book.available) {
      return false;
    }

    if (availability === 'UNAVAILABLE' && book.available) {
      return false;
    }

    if (ratingsSelected.length > 0 && !ratingsSelected.includes(book.rating)) {
      return false;
    }

    return true;
  });

  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + resultsPerPage,
  );

  const totalResults = filteredBooks.length;
  const showingFrom = totalResults === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + resultsPerPage, totalResults);

  return (
    <Container className="py-4">
      <h1>Search Books</h1>

      {/* Formularbereich */}
      <Card className="mt-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6} xs={12}>
                <Form.Group controlId="searchTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Search by Title"
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="searchIsbn">
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="Search by ISBN"
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="searchBookType">
                  <Form.Label>Book Type</Form.Label>
                  <Form.Select
                    value={bookType}
                    onChange={(e) =>
                      setBookType(e.target.value as BookType | 'ALL')
                    }
                  >
                    <option value="ALL">All Types</option>
                    <option value="HARDCOVER">Hardcover</option>
                    <option value="PAPERBACK">Paperback</option>
                    <option value="EPUB">EPUB</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} xs={12}>
                <Form.Group controlId="searchAvailability">
                  <Form.Label>Availability</Form.Label>

                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      id="availability-all"
                      name="availability"
                      label="All"
                      checked={availability === 'ALL'}
                      onChange={() => setAvailability('ALL')}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      id="availability-available"
                      name="availability"
                      label="Available"
                      checked={availability === 'AVAILABLE'}
                      onChange={() => setAvailability('AVAILABLE')}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      id="availability-unavailable"
                      name="availability"
                      label="Unavailable"
                      checked={availability === 'UNAVAILABLE'}
                      onChange={() => setAvailability('UNAVAILABLE')}
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group controlId="searchRatings">
                  <Form.Label>Rating Filter</Form.Label>

                  <div>
                    <Form.Check
                      inline
                      type="checkbox"
                      id="rating-5"
                      label={
                        <span>
                          5 <StarFill className="text-warning ms-1" />
                        </span>
                      }
                      checked={rating5}
                      onChange={(e) => setRating5(e.target.checked)}
                    />

                    <Form.Check
                      inline
                      type="checkbox"
                      id="rating-4"
                      label={
                        <span>
                          4 <StarFill className="text-warning ms-1" />
                        </span>
                      }
                      checked={rating4}
                      onChange={(e) => setRating4(e.target.checked)}
                    />

                    <Form.Check
                      inline
                      type="checkbox"
                      id="rating-3"
                      label={
                        <span>
                          3 <StarFill className="text-warning ms-1" />
                        </span>
                      }
                      checked={rating3}
                      onChange={(e) => setRating3(e.target.checked)}
                    />

                    <Form.Check
                      inline
                      type="checkbox"
                      id="rating-2"
                      label={
                        <span>
                          2 <StarFill className="text-warning ms-1" />
                        </span>
                      }
                      checked={rating2}
                      onChange={(e) => setRating2(e.target.checked)}
                    />

                    <Form.Check
                      inline
                      type="checkbox"
                      id="rating-1"
                      label={
                        <span>
                          1 <StarFill className="text-warning ms-1" />
                        </span>
                      }
                      checked={rating1}
                      onChange={(e) => setRating1(e.target.checked)}
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary">
                    <Search className="me-2" />
                    Search
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Ergebnisbereich */}

      <div className="mt-4 text-muted">
        Showing {showingFrom} to {showingTo} of {totalResults} results
      </div>

      <Card className="mt-4">
        <Card.Body>
          {isLoading && (
            <div className="d-flex justify-content-center my-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

          {!isLoading && filteredBooks.length === 0 && (
            <Card className="text-center py-5">
              <Card.Body>
                <h3>No books found</h3>
                <p className="text-muted">Try adjusting your search filters</p>
              </Card.Body>
            </Card>
          )}
          {!isLoading && filteredBooks.length > 0 && (
            <Row className="g-4">
              {paginatedBooks.map((book) => (
                <Col md={4} key={book.id} className="d-flex">
                  <Link
                    href={`/search/${book.id}`}
                    className="text-decoration-none text-dark d-block w-100 h-100"
                  >
                    <Card className="h-100 w-100" role="button">
                      <Card.Body className="d-flex flex-column">
                        <Row className="mb-2">
                          <Col xs="auto">
                            <Badge bg={getBookTypeBadge(book.bookType)}>
                              {book.bookType}
                            </Badge>
                          </Col>

                          <Col className="text-end">
                            <div className="mb-0">
                              {renderStars(book.rating)}
                            </div>
                          </Col>
                        </Row>

                        <Card.Title className="mb-2">{book.title}</Card.Title>
                        {book.subtitle && (
                          <Card.Subtitle className="mb-2 text-muted">
                            {book.subtitle}
                          </Card.Subtitle>
                        )}

                        <Card.Text className="text-muted">
                          ISBN: {book.isbn}
                        </Card.Text>

                        <Row className="mt-auto align-items-center">
                          <Col>
                            {book.discount && book.discount > 0 ? (
                              <>
                                <span className="text-decoration-line-through text-muted me-2">
                                  €{book.price.toFixed(2)}
                                </span>
                                <span className="fw-bold text-success">
                                  €
                                  {(
                                    book.price *
                                    (1 - book.discount / 100)
                                  ).toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="fw-bold">
                                €{book.price.toFixed(2)}
                              </span>
                            )}
                          </Col>

                          <Col xs="auto">
                            <Badge bg={book.available ? 'success' : 'danger'}>
                              {book.available ? 'Available' : 'Not Available'}
                            </Badge>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          )}

          {/* Pagination */}
          {!isLoading &&
            Math.ceil(filteredBooks.length / resultsPerPage) > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.Prev
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  />
                  {[
                    ...Array(
                      Math.ceil(filteredBooks.length / resultsPerPage),
                    ).keys(),
                  ].map((page) => (
                    <Pagination.Item
                      key={page + 1}
                      active={page + 1 === currentPage}
                      onClick={() => setCurrentPage(page + 1)}
                    >
                      {page + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          Math.ceil(filteredBooks.length / resultsPerPage),
                        ),
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(filteredBooks.length / resultsPerPage)
                    }
                  />
                </Pagination>
              </div>
            )}
        </Card.Body>
      </Card>
    </Container>
  );
}

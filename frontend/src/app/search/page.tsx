'use client';

import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from 'react-bootstrap';

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

  const [rating5, setRating5] = useState(false);
  const [rating4, setRating4] = useState(false);
  const [rating3, setRating3] = useState(false);
  const [rating2, setRating2] = useState(false);
  const [rating1, setRating1] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  // Sterne anzeigen
  const renderStars = (rating: number) => '⭐'.repeat(rating);

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

  const filteredBooks = DUMMY_BOOKS;

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
                      label="5 ⭐"
                      checked={rating5}
                      onChange={(e) => setRating5(e.target.checked)}
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      id="rating-4"
                      label="4 ⭐"
                      checked={rating4}
                      onChange={(e) => setRating4(e.target.checked)}
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      id="rating-3"
                      label="3 ⭐"
                      checked={rating3}
                      onChange={(e) => setRating3(e.target.checked)}
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      id="rating-2"
                      label="2 ⭐"
                      checked={rating2}
                      onChange={(e) => setRating2(e.target.checked)}
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      id="rating-1"
                      label="1 ⭐"
                      checked={rating1}
                      onChange={(e) => setRating1(e.target.checked)}
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary">
                    🔍 Search
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
      <Card className="mt-4">
        <Card.Body>
          <p className="text-muted mb-3">
            Showing 1-{filteredBooks.length} of {filteredBooks.length} results
          </p>

          <Row className="g-3">
            {filteredBooks.map((book) => (
              <Col key={book.id} xs={12} md={6} lg={4}>
                <Card className="h-100">
                  <Card.Body>
                    <Badge
                      bg={getBookTypeBadge(book.bookType)}
                      className="mb-2"
                    >
                      {book.bookType}
                    </Badge>
                    <div className="mb-2">{renderStars(book.rating)}</div>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text className="text-muted">
                      ISBN: {book.isbn}
                    </Card.Text>
                    <Stack
                      direction="horizontal"
                      className="justify-content-between"
                    >
                      <span /> {/* links frei lassen oder später Preis o.ä. */}
                      <Badge bg={book.available ? 'success' : 'danger'}>
                        {book.available ? 'Available' : 'Not Available'}
                      </Badge>
                    </Stack>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

'use client';

import { useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';

type BookType = 'HARDCOVER' | 'PAPERBACK' | 'EPUB';
type Availability = 'ALL' | 'AVAILABLE' | 'UNAVAILABLE';

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
                    <option value="EPUB">ePub</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group controlId="searchAvailability">
                  <Form.Label>Availability</Form.Label>
                  <Form.Select
                    value={availability}
                    onChange={(e) =>
                      setAvailability(e.target.value as Availability)
                    }
                  >
                    <option value="ALL">All</option>
                    <option value="AVAILABLE">Available</option>
                    <option value="UNAVAILABLE">Unavailable</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Ergebnisbereich */}
      <Card className="mt-4">
        <Card.Body>
          {/* hier kommen die Suchergebnisse */}
          Ergebnisbereich
        </Card.Body>
      </Card>
    </Container>
  );
}

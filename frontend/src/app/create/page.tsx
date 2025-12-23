'use client';

import { CREATE_BOOK } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';

export default function CreateBookPage() {
  const [isbn, setIsbn] = useState('');
  const [titel, setTitel] = useState('');
  const [rating, setRating] = useState(5);
  const [art, setArt] = useState('HARDCOVER');
  const [preis, setPreis] = useState('');
  const [error, setError] = useState('');

  const [createBook, { loading }] = useMutation(CREATE_BOOK);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isbn || !titel || !preis) {
      setError('Bitte alle Felder ausfüllen');
      return;
    }

    try {
      await createBook({
        variables: {
          input: {
            isbn,
            rating,
            art,
            preis: parseFloat(preis),
            titel: { titel },
          },
        },
      });
      alert('Buch angelegt!');
    } catch {
      setError('Fehler beim Anlegen');
    }
  };

  return (
    <Container className="py-5">
      <h1>Neues Buch anlegen</h1>

      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Titel</Form.Label>
              <Form.Control
                value={titel}
                onChange={(e) => setTitel(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              >
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Art</Form.Label>
              <Form.Select value={art} onChange={(e) => setArt(e.target.value)}>
                <option value="HARDCOVER">Hardcover</option>
                <option value="EPUB">EPUB</option>
                <option value="PAPERBACK">Paperback</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preis</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={preis}
                onChange={(e) => setPreis(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" disabled={loading}>
              Speichern
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

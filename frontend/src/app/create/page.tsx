'use client';

import { CREATE_BOOK } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';

export default function CreateBookPage() {
  // Pflichtfelder
  const [isbn, setIsbn] = useState('');
  const [titel, setTitel] = useState('');
  const [rating, setRating] = useState(5);
  const [art, setArt] = useState('HARDCOVER');
  const [preis, setPreis] = useState('');

  // Optionale Felder
  const [untertitel, setUntertitel] = useState('');
  const [rabatt, setRabatt] = useState('');
  const [lieferbar, setLieferbar] = useState(false);
  const [datum, setDatum] = useState('');
  const [homepage, setHomepage] = useState('');

  const [error, setError] = useState('');

  const [createBook, { loading }] = useMutation(CREATE_BOOK);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validierung
    if (!isbn || !titel || !preis) {
      setError('Bitte alle Pflichtfelder ausfüllen');
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
            rabatt: rabatt ? parseFloat(rabatt) : undefined,
            lieferbar,
            datum: datum || undefined,
            homepage: homepage || undefined,
            titel: {
              titel,
              untertitel: untertitel || undefined,
            },
          },
        },
      });
      alert('Buch angelegt!');
      // Reset
      setIsbn('');
      setTitel('');
      setUntertitel('');
      setRating(5);
      setArt('HARDCOVER');
      setPreis('');
      setRabatt('');
      setLieferbar(false);
      setDatum('');
      setHomepage('');
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
              <Form.Label>ISBN *</Form.Label>
              <Form.Control
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Titel *</Form.Label>
              <Form.Control
                value={titel}
                onChange={(e) => setTitel(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Untertitel</Form.Label>
              <Form.Control
                value={untertitel}
                onChange={(e) => setUntertitel(e.target.value)}
                placeholder="Optional"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating *</Form.Label>
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
              <Form.Label>Art *</Form.Label>
              <Form.Select value={art} onChange={(e) => setArt(e.target.value)}>
                <option value="HARDCOVER">Hardcover</option>
                <option value="EPUB">EPUB</option>
                <option value="PAPERBACK">Paperback</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preis *</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={preis}
                onChange={(e) => setPreis(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rabatt (%)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={rabatt}
                onChange={(e) => setRabatt(e.target.value)}
                placeholder="Optional, z.B. 10"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Lieferbar"
                checked={lieferbar}
                onChange={(e) => setLieferbar(e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Datum</Form.Label>
              <Form.Control
                type="date"
                value={datum}
                onChange={(e) => setDatum(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Homepage</Form.Label>
              <Form.Control
                type="url"
                value={homepage}
                onChange={(e) => setHomepage(e.target.value)}
                placeholder="https://example.com"
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

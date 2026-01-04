'use client';

import { CREATE_BOOK } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';

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

  // Neue Felder
  const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
  const [abbildungen, setAbbildungen] = useState<
    Array<{
      beschriftung: string;
      contentType: string;
    }>
  >([]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [createBook, { loading }] = useMutation(CREATE_BOOK);

  // Verfügbare Keywords
  const verfuegbareSchlagwoerter = [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'GraphQL',
    'Web Development',
    'Frontend',
    'Backend',
    'API',
    'Database',
    'CSS',
    'HTML',
    'Testing',
    'DevOps',
  ];

  const handleKeywordToggle = (keyword: string) => {
    if (schlagwoerter.includes(keyword)) {
      setSchlagwoerter(schlagwoerter.filter((k) => k !== keyword));
    } else {
      setSchlagwoerter([...schlagwoerter, keyword]);
    }
  };

  const handleAddImage = () => {
    setAbbildungen([
      ...abbildungen,
      { beschriftung: '', contentType: 'image/jpeg' },
    ]);
  };

  const handleRemoveImage = (index: number) => {
    setAbbildungen(abbildungen.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, field: string, value: string) => {
    const newAbbildungen = [...abbildungen];
    newAbbildungen[index] = { ...newAbbildungen[index], [field]: value };
    setAbbildungen(newAbbildungen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validierung
    if (!isbn || !titel || !preis) {
      setError('Bitte alle Pflichtfelder (*) ausfüllen');
      return;
    }

    try {
      const input = {
        isbn,
        rating: parseInt(rating.toString()),
        art,
        preis: parseFloat(preis),
        rabatt: rabatt ? parseFloat(rabatt) : undefined,
        lieferbar,
        datum: datum || undefined,
        homepage: homepage || undefined,
        schlagwoerter,
        titel: {
          titel,
          untertitel: untertitel || undefined,
        },
        abbildungen: abbildungen.length > 0 ? abbildungen : undefined,
      };

      await createBook({ variables: { input } });

      setSuccess(true);
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
      setSchlagwoerter([]);
      setAbbildungen([]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Fehler beim Anlegen des Buchs',
      );
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Neues Buch anlegen</h1>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && <Alert variant="success">Buch erfolgreich angelegt!</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Basic Information Card */}
        <Card className="mb-4">
          <Card.Header>
            <h5 className="mb-0">Grundinformationen</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>ISBN *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="978-0-123456-78-9"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Art *</Form.Label>
                  <Form.Select
                    value={art}
                    onChange={(e) => setArt(e.target.value)}
                  >
                    <option value="HARDCOVER">Hardcover</option>
                    <option value="EPUB">EPUB</option>
                    <option value="PAPERBACK">Paperback</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Titel *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter book title"
                    value={titel}
                    onChange={(e) => setTitel(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Untertitel</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter subtitle (optional)"
                    value={untertitel}
                    onChange={(e) => setUntertitel(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rating (1-5) *</Form.Label>
                  <Form.Select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Bad</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Price Information Card */}
        <Card className="mb-4">
          <Card.Header>
            <h5 className="mb-0">Preisinformationen</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Preis *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                    value={preis}
                    onChange={(e) => setPreis(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Rabatt (%)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="10"
                    value={rabatt}
                    onChange={(e) => setRabatt(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={4} className="d-flex align-items-end">
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Lieferbar"
                    checked={lieferbar}
                    onChange={(e) => setLieferbar(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Metadata Card */}
        <Card className="mb-4">
          <Card.Header>
            <h5 className="mb-0">Metadaten</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Datum</Form.Label>
                  <Form.Control
                    type="date"
                    value={datum}
                    onChange={(e) => setDatum(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Homepage</Form.Label>
                  <Form.Control
                    type="url"
                    value={homepage}
                    onChange={(e) => setHomepage(e.target.value)}
                    placeholder="https://example.com"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Schlagwörter</Form.Label>
                  <div className="mb-3 p-3 bg-light rounded">
                    <p className="mb-2 small">Wähle Schlagwörter aus:</p>
                    <div className="d-flex flex-wrap gap-2">
                      {verfuegbareSchlagwoerter.map((keyword) => (
                        <Badge
                          key={keyword}
                          bg={
                            schlagwoerter.includes(keyword)
                              ? 'primary'
                              : 'secondary'
                          }
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleKeywordToggle(keyword)}
                        >
                          {keyword}
                          {schlagwoerter.includes(keyword) && ' ✓'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {schlagwoerter.length > 0 && (
                    <div>
                      <p className="mb-2 small">Ausgewählte Schlagwörter:</p>
                      <div className="d-flex flex-wrap gap-2">
                        {schlagwoerter.map((keyword, index) => (
                          <Badge key={index} bg="success">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Images Card */}
        <Card className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Abbildungen</h5>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleAddImage}
              type="button"
            >
              + Abbildung hinzufügen
            </Button>
          </Card.Header>
          <Card.Body>
            {abbildungen.length === 0 ? (
              <p className="text-muted mb-0">
                Keine Abbildungen hinzugefügt. Klicke auf &quot;Abbildung
                hinzufügen&quot; um eine hinzuzufügen.
              </p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {abbildungen.map((abbildung, index) => (
                  <Card key={index} className="bg-light">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Abbildung {index + 1}</h6>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveImage(index)}
                          type="button"
                        >
                          Entfernen
                        </Button>
                      </div>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Beschriftung</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Beschreibung der Abbildung"
                              value={abbildung.beschriftung}
                              onChange={(e) =>
                                handleImageChange(
                                  index,
                                  'beschriftung',
                                  e.target.value,
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Content Type</Form.Label>
                            <Form.Select
                              value={abbildung.contentType}
                              onChange={(e) =>
                                handleImageChange(
                                  index,
                                  'contentType',
                                  e.target.value,
                                )
                              }
                            >
                              <option value="image/jpeg">JPEG</option>
                              <option value="image/png">PNG</option>
                              <option value="image/webp">WebP</option>
                              <option value="image/gif">GIF</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </Card.Body>
        </Card>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Saving...' : 'Speichern'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.history.back()}
          >
            Abbrechen
          </Button>
        </div>
      </Form>
    </Container>
  );
}

'use client';

import { CREATE_BOOK } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { Plus, Save, Trash2, X } from 'lucide-react';
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

interface FormErrors {
  [key: string]: string;
}

const dateToIsoDateTime = (dateStr: string) => {
  // Fix von "2026-01-07" zu "2026-01-07T00:00:00.000Z" !!
  if (!dateStr) return undefined;
  return new Date(`${dateStr}T00:00:00.000Z`).toISOString();
};

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

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  const [createBook, { loading }] = useMutation(CREATE_BOOK);

  // Verfügbare Keywords - UPPERCASE wie in der DB!
  const verfuegbareSchlagwoerter = [
    'TYPESCRIPT',
    'JAVASCRIPT',
    'JAVA',
    'PYTHON',
  ];

  const handleChange = (field: string) => {
    // Fehler für dieses Feld löschen wenn es geändert wird
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

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

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!isbn.trim()) {
      newErrors.isbn = 'ISBN ist erforderlich';
    }

    if (!titel.trim()) {
      newErrors.titel = 'Titel ist erforderlich';
    }

    if (!preis || parseFloat(preis) <= 0) {
      newErrors.preis = 'Preis muss größer als 0 sein';
    }

    if (rabatt && (parseFloat(rabatt) < 0 || parseFloat(rabatt) > 1)) {
      newErrors.rabatt =
        'Rabatt muss zwischen 0 und 1 liegen (z.B. 0.1 für 10%)';
    }

    if (homepage && !homepage.match(/^https?:\/\/.+/)) {
      newErrors.homepage = 'Homepage muss eine gültige URL sein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    // Validierung
    if (!validate()) {
      return;
    }

    try {
      const input = {
        isbn: isbn.trim(),
        rating: parseInt(rating.toString()),
        art,
        preis: parseFloat(preis),
        rabatt: rabatt ? parseFloat(rabatt) : undefined,
        lieferbar,
        // ✅ FIX: Prisma erwartet ISO-8601 DateTime
        datum: dateToIsoDateTime(datum),
        homepage: homepage.trim() || undefined,
        schlagwoerter: schlagwoerter.length > 0 ? schlagwoerter : undefined,
        titel: {
          titel: titel.trim(),
          untertitel: untertitel.trim() || undefined,
        },
        abbildungen: abbildungen.length > 0 ? abbildungen : undefined,
      };

      await createBook({
        variables: { input },
        refetchQueries: ['GetBooks'],
      });

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
      setErrors({});
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Fehler beim Anlegen des Buchs';
      setErrors({ submit: errorMessage });
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Neues Buch anlegen</h1>

      {errors.submit && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setErrors({ ...errors, submit: '' })}
        >
          {errors.submit}
        </Alert>
      )}
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(false)}>
          Buch erfolgreich angelegt!
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Basic Information Card */}
        <Card className="mb-4">
          <Card.Header>
            <h5 className="mb-0">Grundinformationen</h5>
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="isbn">
                  <Form.Label>
                    ISBN <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="978-3-897-22583-1"
                    value={isbn}
                    onChange={(e) => {
                      setIsbn(e.target.value);
                      handleChange('isbn');
                    }}
                    isInvalid={!!errors.isbn}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.isbn}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="art">
                  <Form.Label>
                    Art <span className="text-danger">*</span>
                  </Form.Label>
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

              <Col md={12}>
                <Form.Group className="mb-3" controlId="titel">
                  <Form.Label>
                    Titel <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Buchtitel eingeben"
                    value={titel}
                    onChange={(e) => {
                      setTitel(e.target.value);
                      handleChange('titel');
                    }}
                    isInvalid={!!errors.titel}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.titel}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3" controlId="untertitel">
                  <Form.Label>Untertitel</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Untertitel eingeben (optional)"
                    value={untertitel}
                    onChange={(e) => setUntertitel(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="rating">
                  <Form.Label>
                    Rating (1-5) <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  >
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
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
            <Row className="g-3">
              <Col md={4}>
                <Form.Group className="mb-3" controlId="preis">
                  <Form.Label>
                    Preis <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                    value={preis}
                    onChange={(e) => {
                      setPreis(e.target.value);
                      handleChange('preis');
                    }}
                    isInvalid={!!errors.preis}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.preis}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="rabatt">
                  <Form.Label>Rabatt (Dezimal)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.001"
                    min="0"
                    max="1"
                    placeholder="0.1 für 10%"
                    value={rabatt}
                    onChange={(e) => {
                      setRabatt(e.target.value);
                      handleChange('rabatt');
                    }}
                    isInvalid={!!errors.rabatt}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rabatt}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Beispiel: 0.1 = 10%, 0.25 = 25%
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={4} className="d-flex align-items-end">
                <Form.Group className="mb-3" controlId="lieferbar">
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
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="datum">
                  <Form.Label>Datum</Form.Label>
                  <Form.Control
                    type="date"
                    value={datum}
                    onChange={(e) => setDatum(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="homepage">
                  <Form.Label>Homepage</Form.Label>
                  <Form.Control
                    type="url"
                    value={homepage}
                    onChange={(e) => {
                      setHomepage(e.target.value);
                      handleChange('homepage');
                    }}
                    placeholder="https://acme.at"
                    isInvalid={!!errors.homepage}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.homepage}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3" controlId="schlagwoerter">
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
              className="d-flex align-items-center gap-2"
            >
              <Plus size={16} />
              <span>Abbildung hinzufügen</span>
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
                          className="d-flex align-items-center gap-1"
                        >
                          <Trash2 size={14} />
                          <span>Entfernen</span>
                        </Button>
                      </div>
                      <Row className="g-2">
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

        <div className="d-flex gap-3 justify-content-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.history.back()}
            className="d-flex align-items-center gap-2"
          >
            <X size={18} />
            <span>Abbrechen</span>
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="d-flex align-items-center gap-2"
          >
            <Save size={18} />
            <span>{loading ? 'Speichert...' : 'Speichern'}</span>
          </Button>
        </div>
      </Form>
    </Container>
  );
}

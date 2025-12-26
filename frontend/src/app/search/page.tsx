'use client';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export default function SearchPage() {
  return (
    <Container className="py-4">
      <h1>Search Books</h1>

      {/* Formularbereic */}
      <Card className="mt-4">
        <Card.Body>
          {/* hier kommt das formular */}
          Formularbereich
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

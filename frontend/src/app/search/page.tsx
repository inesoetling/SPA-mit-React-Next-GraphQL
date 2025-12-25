import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Container from 'react-bootstrap/Container';

export default function SearchPage() {
  return (
    <Container className="py-4">
      <h1>Search Books</h1>

      {/* Formularbereich */}
      <Card className="mt-4">
        <CardBody>
          {/* hier kommt das formular */}
          Formularbereich
        </CardBody>
      </Card>

      {/* Ergebnisbereich */}
      <Card className="mt-4">
        <CardBody>
          {/* hier kommen die Suchergebnisse */}
          Ergebnisbereich
        </CardBody>
      </Card>
    </Container>
  );
}

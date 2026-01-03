import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <Container className="centered-page">
      <Image src="/BookLogo.png"
      width={400}
      height={400}
      alt="Logo" rounded  />
      <h1>Buch-Verwaltung</h1>
      <p className="lead">Willkommen</p>
      <div className="d-flex gap-3 justify-content-center mt-4">
        <Link href="/books">
          <Button variant="primary">Bücher</Button>
        </Link>
        <Link href="/create">
          <Button variant="success">Neu</Button>
        </Link>
        <Link href="/login">
          <Button variant="outline-primary">Login</Button>
        </Link>
      </div>
    </Container>
  );
}

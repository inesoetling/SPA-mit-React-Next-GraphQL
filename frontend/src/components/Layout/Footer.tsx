import { Container } from 'react-bootstrap';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light py-4 mt-5 border-top">
      <Container>
        <div className="text-center text-muted">
          <p className="mb-0">
            © {currentYear} BookManager. Alle Rechte vorbehalten.
          </p>
        </div>
      </Container>
    </footer>
  );
}

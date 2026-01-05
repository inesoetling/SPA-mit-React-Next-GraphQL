'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button, Container } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

export default function BookDetailsPage() {
  const params = useParams<{ id: string }>();
  const bookId = params.id;

  return (
    <Container className="py-4">
      <h1>Book Details</h1>

      <p className="text-muted">Book ID: {bookId}</p>

      <Link href="/search" className="text-decoration-none">
        <Button variant="outline-primary">
          <ArrowLeft className="me-2" />
          Back to Search
        </Button>
      </Link>
    </Container>
  );
}

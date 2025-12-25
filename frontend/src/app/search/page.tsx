import Container from 'react-bootstrap/Container';

export default function SearchPage() {
  return (
    <Container className="py-4">
      <h1>Search Books</h1>

      <div
        style={{
          border: '1px solid #ccc',
          padding: '16px',
          borderRadius: '8px',
          marginTop: '16px',
        }}
      >
        {/* hier kommt das formular */}
        Formularbereich
      </div>
    </Container>
  );
}

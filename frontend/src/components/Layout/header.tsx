'use client';

import { Navbar, Nav, Button} from 'react-bootstrap';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand as={Link} href="/">
          BookManager
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} href="/books">Bücher</Nav.Link>
          <Nav.Link as={Link} href="/create">Neu</Nav.Link>
        </Nav>
          <Button variant="outline-light">Logout</Button>
    </Navbar>
  );
};

export default Header;

'use client';

import { Navbar, Nav, Button} from 'react-bootstrap';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand as={Link} href="/">
          <Image src="/BookLogo.png"
            width={40}
            height={40}
            alt="Logo"/>
          BookManager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/books">Suchen</Nav.Link>
            <Nav.Link as={Link} href="/create">Neues Buch</Nav.Link>
          </Nav>
          <Button variant="outline-light">Logout</Button>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

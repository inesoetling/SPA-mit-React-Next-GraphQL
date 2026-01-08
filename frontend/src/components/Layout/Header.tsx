'use client';

import { BookOpen, Home, LogOut, PlusCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export default function Header({ isLoggedIn = false, onLogout }: HeaderProps) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Link
          href="/"
          className="navbar-brand d-flex align-items-center gap-2"
          style={{ cursor: 'pointer' }}
        >
          <BookOpen size={24} />
          <span>BookManager</span>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" className="nav-link d-flex align-items-center gap-2">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              href="/search"
              className="nav-link d-flex align-items-center gap-2"
            >
              <Search size={18} />
              <span>Suche</span>
            </Link>
            <Link
              href="/create"
              className="nav-link d-flex align-items-center gap-2"
            >
              <PlusCircle size={18} />
              <span>Neues Buch</span>
            </Link>
          </Nav>

          {isLoggedIn && onLogout && (
            <Button
              variant="outline-light"
              onClick={onLogout}
              className="d-flex align-items-center gap-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

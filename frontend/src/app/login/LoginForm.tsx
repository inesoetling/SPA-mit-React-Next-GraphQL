"use client";

import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

//https://www.w3schools.com/react/react_forms.asp
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Bitte beide Felder ausfüllen");
      return;
    };
  };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>Password</Form.Label>
      <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
      />
      </Form.Group>

      <Button
        type="submit">
          Sign In
      </Button>
    </Form>
    </>
  );
};

export default LoginForm;

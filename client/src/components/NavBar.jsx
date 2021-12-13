import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light" expand="sm">
      <Container>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav" className="justify-content-between">
          <Nav>
            <Link to="/" className="navbar-brand">
              Home
            </Link>
            <Link to="/search" className="nav-link">
              Search
            </Link>
            <Link to="/create" className="nav-link">
              Create User
            </Link>
          </Nav>
          <Nav>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

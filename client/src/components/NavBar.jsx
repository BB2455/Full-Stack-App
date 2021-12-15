import React, { useState, useEffect, useCallback } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import decode from "jwt-decode";

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logOut = useCallback(() => {
    dispatch(logout());
    setCurrentUser(null);
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("profile"))?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }
    setCurrentUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, logOut]);

  return (
    <Navbar bg="light" variant="light" expand="sm">
      <Container>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav" className="justify-content-between">
          <Nav>
            <Link to="/" className="navbar-brand">
              Home
            </Link>
            <NavLink to="/search" className="nav-link">
              Search
            </NavLink>
            {currentUser && (
              <NavLink to="/create" className="nav-link">
                Create User
              </NavLink>
            )}
          </Nav>
          <Nav>
            {location.pathname !== "/login" ? (
              currentUser ? (
                <Button variant="secondary" size="sm" onClick={logOut}>
                  Log Out
                </Button>
              ) : (
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              )
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

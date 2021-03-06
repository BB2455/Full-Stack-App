import React, { useState, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, getRefreshToken } from '../actions/auth'
import { PersonCircle } from 'react-bootstrap-icons'
import { getActiveProfile } from '../utils/getActiveProfile'
import { getDecodedToken } from '../utils/getDecodedToken'

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState(getActiveProfile())
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const logOut = () => {
    dispatch(logout()).then(() => {
      setCurrentUser(null)
      navigate('/login')
    })
  }

  useEffect(() => {
    const profile = getActiveProfile()

    if (profile?.accessToken) {
      const decodedToken = getDecodedToken(profile.accessToken)
      if (decodedToken.exp * 1000 - 60000 < new Date().getTime()) {
        dispatch(getRefreshToken())
      }
    }
    setCurrentUser(profile)
  }, [location, dispatch])
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
            {location.pathname !== '/login' ? (
              currentUser ? (
                <>
                  <NavDropdown
                    title={<PersonCircle size="1.5rem" />}
                    id="user-menu-dropdown"
                    align="end"
                  >
                    <NavDropdown.Header>
                      {getDecodedToken(currentUser?.accessToken)?.username}
                    </NavDropdown.Header>
                    <NavDropdown.Divider />
                    <Link className="dropdown-item" to="/profile/settings">
                      Settings
                    </Link>
                    <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
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
  )
}

export default NavBar

import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout,isUserLoggedIn } from '../../actions';

export default function Header(props) {
  const state = useSelector(state => state.state);
  const dispatch = useDispatch();

  // console.log('header',state);

  const logoutHandle = function() {  
    dispatch(logout());
  }

  const renderLoggedInLinks = function() {
    return (
      <Nav>
        <li className="nav-item">
          {/* <NavLink to="/signout" className="nav-link">Signout</NavLink> */}
          <span className="nav-link" onClick={logoutHandle} style={{cursor: 'pointer'}}>Signout</span>
        </li>
      </Nav>
    );
  }

  const renderNonLoggedInLinks = function() {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">Signin</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">Signup</NavLink>
        </li>
      </Nav>
    );
  }

  return (
    <Navbar className="navbar-header" collapseOnSelect bg="dark" expand="lg" variant='dark' >
        <Container fluid>
          {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
          <Link to="/" className='navbar-brand'>Admin Dashboard</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link> */}
              {/* <Nav.Link href="#link">Link</Nav.Link> */}
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            {state.auth.authenticate? renderLoggedInLinks(): renderNonLoggedInLinks()}
          </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

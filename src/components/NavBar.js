import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../store/auth';

const NavBar = ({ auth, isLoggedIn, logout }) => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Space Shopper</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavDropdown eventKey={3} title="Categories" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Planets</MenuItem>
            <MenuItem eventKey={3.2}>Comets</MenuItem>
            <MenuItem eventKey={3.3}>Stars</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Link for extra rich people</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          {isLoggedIn ? (
            <NavItem eventKey={1} href="#" onClick={logout}>
              Logout {auth.username}
            </NavItem>
          ) : (
            <NavItem eventKey={1} href="#login">
              Login
            </NavItem>
          )}
          {isLoggedIn ? null : (
            <NavItem eventKey={2} href="#signup">
              Signup
            </NavItem>
          )}
          <NavItem eventKey={2} href="#">
            Cart
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
const mapStateToProps = ({ auth }) => {
  return {
    isLoggedIn: auth.id,
    auth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

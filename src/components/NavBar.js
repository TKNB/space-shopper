import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../store/auth';

const NavBar = ({ auth, isLoggedIn, logout }) => {
  return (
    <Navbar color="faded" fixed expand="md">
      <NavbarBrand href="/">
        Space Shopper
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Categories
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Planets</DropdownItem>
            <DropdownItem>Comets</DropdownItem>
            <DropdownItem>Stars</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Link for extra rich people</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        {isLoggedIn ? null : (
          <NavItem>
            <NavLink href="#login">Login</NavLink>
          </NavItem>
        )}
        {isLoggedIn ? (
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {auth.username}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                {' '}
                <NavLink href="#my_orders">My Orders</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="#account">
                  Account Details: {auth.username}
                </NavLink>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <NavLink href="#" onClick={logout}>
                  Logout
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (
          <NavItem>
            <NavLink href="#signup">Signup</NavLink>
          </NavItem>
        )}
        {isLoggedIn ? (
          <NavItem>
            <NavLink href="#add_product">Add a New Product</NavLink>
          </NavItem>
        ) : null}
        <NavItem>
          <NavLink href="#cart">Cart</NavLink>
        </NavItem>
      </Nav>
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

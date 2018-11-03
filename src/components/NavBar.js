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

const NavBar = ({ auth, isLoggedIn, logout, productsCount }) => {
  return (
    <Navbar color="faded" light fixed expand="md">
      <NavbarBrand>
        <a href="#">Space Shopper</a>
      </NavbarBrand>
      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Categories
            </DropdownToggle>
            <NavItem>

              <NavLink href="#products/page/0">Products ({productsCount})</NavLink>
            </NavItem>

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
      </Collapse>
    </Navbar>
  );
};
const mapStateToProps = ({ auth, productsCount }) => {
  return {
    isLoggedIn: auth.id,
    auth,
    productsCount,
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

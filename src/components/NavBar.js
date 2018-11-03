import React, { Component } from 'react';
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
import { Link } from 'react-router-dom';

import { logout } from '../store/auth';
// import { getCategories } from '../store/categories';


class NavBar extends Component {
  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.isOpen });
  }

  render () {
    const { auth, isLoggedIn, itemCount, productsCount, logout } = this.props;
    return (
      <Navbar className="fullNavBar" color="faded" fixed expand="md">
        <NavbarBrand href="/">Space Shopper</NavbarBrand>
        <Collapse className="mr-auto" isOpen={this.state.isOpen} navbar>
          <Nav className="d-flex justify-content-end">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="topNavLink" nav caret>
                Products ({productsCount})
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className="topNavLink" href="#/products">All Products ({productsCount})</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Planets</DropdownItem>
                <DropdownItem>Comets</DropdownItem>
                <DropdownItem>Stars</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {isLoggedIn ? (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="topNavLink" nav caret>
                {auth.username}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  {' '}
                  <NavLink href="#my_orders">
                    My Orders
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="#add_product">
                    Add a New Product
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="#account">
                    Account Details
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#" onClick={logout}>
                  <NavLink >
                    Logout
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <NavItem>
              <NavLink className="topNavLink" href="#login">Login</NavLink>
            </NavItem>
            )}
            <NavItem>
              <NavLink className="topNavLink" href="#cart">Cart ({itemCount})</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )}
}

const mapStateToProps = ({ auth, cart, productsCount }) => {
  return {
    isLoggedIn: auth.id,
    auth,
    itemCount: !cart.id ? 0 : cart.lineItems.reduce((count,lineItem) => {
      return count + lineItem.qty
    },0),
    productsCount
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    // getCategories: () => dispatch(getCategories())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

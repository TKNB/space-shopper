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

import { logout } from '../store/auth';
import { _getCart } from '../store/cart';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.isOpen });
  }

  render() {
    const { auth, isLoggedIn, itemCount, productsCount, categories, logout } = this.props;
    return (
      <Navbar className="fullNavBar" color="faded" expand="md">
        <NavbarBrand href="/">Space Shopper</NavbarBrand>
      
        {/* THIS IS THE DESKTOP VERSION - DETERMINED BY NAV CLASS DESKTOP-VERSION */}
        <Nav className="d-flex justify-content-end desktop-version">
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle className="topNavLink" caret nav >
              Products ({productsCount})
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem className="topNavLink" href="#/products/page/0">All Products ({productsCount})</DropdownItem>
              <DropdownItem divider />
              {
              categories ? categories.map(category => <DropdownItem href={`#/products?category=${category.name}`}key={category.id}>{category.name}</DropdownItem>) : null
              }
            </DropdownMenu>
          </UncontrolledDropdown>
          {isLoggedIn ? (
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle className="topNavLink" nav caret>
              {auth.username}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="#my_orders">
                  My Orders
              </DropdownItem>
              <DropdownItem href="#add_product">
                  Add a New Product
              </DropdownItem>
              <DropdownItem href="#account">
                  Account Details
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#" onClick={logout}>
                  Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (
          <NavItem>
            <NavLink className="topNavLink" href="#login">Login</NavLink>
          </NavItem>
          )}
          <NavItem>
            <NavLink id="cartIcon" className="topNavLink" href="#cart">
              <img src="cartIcon.png" alt="cart" height="30px" />
              <div id="itemCount">{itemCount}</div>
            </NavLink>
          </NavItem>
        </Nav>

        {/* THIS IS THE MOBILE VERSION - DETERMINED BY NAV CLASS MOBILE-VERSION */}
        <Nav className="mobile-version d-flex">
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle className="hamburgerMenu topNavLink" nav >
                Menu
            </DropdownToggle>
            {isLoggedIn ? (
            <DropdownMenu right>
              <DropdownItem href="#/products/page/0">
                Products ({productsCount})
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#account">
                {auth.username}
              </DropdownItem>
              <DropdownItem href="#my_orders">
                My Orders
              </DropdownItem>
              <DropdownItem href="#add_product">
                Add a New Product
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#" onClick={logout}>
                Logout
              </DropdownItem>
            </DropdownMenu>)
              : (
            <DropdownMenu right>
              <DropdownItem className="topNavLink">
                Products ({productsCount})
              </DropdownItem>
              <DropdownItem className="topNavLink" href="#login">
                Login
              </DropdownItem>
            </DropdownMenu>
              )}
          </UncontrolledDropdown>
          <NavItem>
            <NavLink id="cartIcon" className="topNavLink" href="#cart">
              <img src="cartIcon.png" alt="cart" height="30px" />
              <div id="itemCount">{itemCount}</div>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

const mapStateToProps = ({ auth, cart, productsCount, categories }) => {
  return {
    isLoggedIn: auth.id,
    auth,
    itemCount: !cart.id ? 0 : cart.lineItems.reduce((count, lineItem) => {
      return count + lineItem.qty
    },0),
    productsCount,
    categories
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
      dispatch(_getCart({}));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

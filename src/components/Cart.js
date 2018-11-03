import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CartItems from './CartItems';
import Checkout from './Checkout';

class Cart extends Component {
  constructor ({ order, auth }) {
    super();
    this.state = {
      cart: {},
      auth: {}
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.cart !== this.props.cart) {
      console.log('!!!----CART1---!!!')
      this.setState({
        cart: this.props.cart,
        auth: this.props.auth
      })
    }
  }

  render () {
    const { cart, auth, history } = this.props;
    if (cart.id) {
      console.log(cart.lineItems)
      return (
        <div id="cart">
          <div id="cartItems">
              {cart.lineItems ? cart.lineItems.map( lineItem => <CartItems key={lineItem.id} lineItem={lineItem} />): ''}
          </div>
          <Checkout auth={auth} order={cart} history={history} />
        </div>
      )
    }
    else {
      return (
        <div>Your cart is as empty as a black hole!</div>
      )
    }
  }
}

const mapStateToProps = ({ auth, cart }) => ({
  cart,
  auth,
})

export default connect(mapStateToProps)(Cart);

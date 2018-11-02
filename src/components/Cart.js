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
            <ul>
              {cart.lineItems ? cart.lineItems.map( lineItem => <CartItems key={lineItem.id} lineItem={lineItem} />): ''}
            </ul>
          </div>
          <hr />
          {/* <Checkout auth={auth} history={history} /> */}
        </div>
      )
    }
    else {
      return (
        <div id="cart">Your cart is as empty as a black hole!</div>
      )
    }
  }
}

const mapStateToProps = ({ auth, cart }) => ({
  cart,
  auth,
})

export default connect(mapStateToProps)(Cart);

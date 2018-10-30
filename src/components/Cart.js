import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CartItems from './CartItems';
import Checkout from './Checkout';

class Cart extends Component {
  constructor ({ order, auth }) {
    super();
    this.state = {
      order: [],
      auth: []
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.order !== this.props.order) {
      this.setState({
        order: this.props.order,
        auth: this.props.auth
      })
    }
  }

  render () {
    const { order, auth } = this.props;
    if (order) {
      return (
        <div id="cart">
          <CartItems order={order} />
          <hr />
          <Route path="/cart" render={ (props) => <Checkout auth={auth} order={order} props={props} />} />
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

const mapStateToProps = (state) => ({
  order: state.orders.filter(order => order.userId === state.auth.id && !order.complete).pop(),
  auth: state.auth
})

export default connect(mapStateToProps)(Cart);

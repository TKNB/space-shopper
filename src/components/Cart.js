import React from 'react';
import { connect } from 'react-redux';

import CartItems from './CartItems';
import Checkout from './Checkout';

const Cart = ({ order, auth }) => {
  // need to add defensive routing when cart empty
  console.log(order);
  return (
    <div id="cart">
      <CartItems order={order} />
      <hr />
      <Checkout auth={auth} order={order} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  order: state.orders[2], // needs to be changed to filter for auth's id
  auth: state.auth // hardcoded to Carl Sagan
})

export default connect(mapStateToProps)(Cart);

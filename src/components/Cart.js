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
  order: state.orders.filter(order => order.userId === state.auth.id && !order.completed),
  auth: state.auth
})

export default connect(mapStateToProps)(Cart);

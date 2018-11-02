import React from 'react';
import { connect } from 'react-redux';

import { placeOrder } from '../store/orders';
import cartReducer from '../store/cart';

const Checkout = ({ order, orderSummary, auth, history, placeOrder }) => {
  const { subtotal, discount, tax } = orderSummary; // orderSummary generated in mapStateToProps
  if(order.id) {
    return (
      <div id="checkout">
        <p>Subtotal: {subtotal / 100}</p>
        <p>Discount: {discount / 100}</p>
        <p>Tax: {tax / 100}</p>
        <p>Total: {(subtotal - discount + tax) / 100}</p>
        <hr />
        <p>Payment User: {auth.firstName} {auth.lastName}</p>
        <button type="button" onClick={() => placeOrder(order.id, history)}> Place order </button>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  orderSummary: {
    subtotal: ownProps.order.lineItems.reduce((total, lineItem) => {
      return total + (lineItem.qty * lineItem.product.price)
    },0),
    tax: 0,
    discount: 0,
  },
  order: ownProps.order,
  auth: ownProps.auth,
  history: ownProps.history,
})

const mapDispatchToProps = (dispatch) => ({
  placeOrder: (orderId, history) => dispatch(placeOrder(orderId, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

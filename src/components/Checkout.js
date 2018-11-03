import React from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardTitle, CardText, Button } from 'reactstrap';

import { placeOrder } from '../store/orders';
import cartReducer from '../store/cart';
import { currency } from '../../utils/formatter';

const Checkout = ({ order, orderSummary, auth, history, placeOrder }) => {
  const { subtotal, discount, tax } = orderSummary; // orderSummary generated in mapStateToProps
  if(order.id) {
    return (
      <div id="checkout">
        <Card>
          <CardTitle>Blastoff Summary</CardTitle>
          <table>
            <tbody>
              <tr><td>Subtotal</td><td className="val">{currency.format(subtotal / 100)}</td></tr>
              <tr><td>Discount</td><td className="val">{currency.format(discount / 100)}</td></tr>
              <tr><td>Tax</td><td className="val">{currency.format(tax / 100)}</td></tr>
              <tr><td>Total</td><td className="val">{currency.format((subtotal - discount + tax) / 100)}</td></tr>
            </tbody>
          </table>
          <hr />
          <CardText>Payment User: {auth.firstName} {auth.lastName}</CardText>
          <Button type="button" onClick={() => placeOrder(order.id, history)}> Blastoff </Button>
        </Card>
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

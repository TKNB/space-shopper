import React from 'react';
import { connect } from 'react-redux';

import { updateLineItem } from '../store/orders';

const CartItems = ({ order, updateLineItem }) => {
  return (
    <div id="cartItems">
      <ul>
        {
        order.lineItems.filter(lineItem => (lineItem.qty > 0)).map(lineItem => {
          return (
          <li key={lineItem.id}>
            Name: {lineItem.product.name} || 
            Price: ${lineItem.product.price / 100} || 
            Qty: {lineItem.qty} || 
            Edit: 
            <button type="button" onClick={() => updateLineItem(lineItem.id, {qty: 1 + lineItem.qty})}> + </button>
            <button type="button" onClick={() => updateLineItem(lineItem.id, {qty: -1 + lineItem.qty})}> - </button>
          </li>)
        })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  order: ownProps.order
})

const mapDispatchToProps = (dispatch) => ({
  updateLineItem: (lineItemId, data) => dispatch(updateLineItem(lineItemId, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);

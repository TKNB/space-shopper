import React from 'react';
import { connect } from 'react-redux';

import { updateLineItem } from '../store/cart';

const CartItems = ({ lineItem, updateLineItem }) => {
  console.log(lineItem)
  return (
      <li>
        Name: {lineItem.product.name} || 
        Price: ${lineItem.product.price / 100} || 
        Qty: {lineItem.qty} || 
        Edit: 
        <button type="button" onClick={() => updateLineItem(lineItem.id, {qty: 1 + lineItem.qty})}> + </button>
        <button type="button" onClick={() => updateLineItem(lineItem.id, {qty: -1 + lineItem.qty})}> - </button>
      </li>
  )
}

const mapDispatchToProps = (dispatch) => ({
  updateLineItem: (lineItemId, data) => dispatch(updateLineItem(lineItemId, data))
})

export default connect(null, mapDispatchToProps)(CartItems);

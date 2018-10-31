import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Confirmation = ({ order, props }) => {
  if (order) {
    return (
      <div id="confirmation">
        <h3>Wow! That order was out of this world!</h3>
        <div id="orderSummary">
          <ul>
            {
            order.lineItems.map(lineItem => { return (
              <li key={lineItem.id}>
                Name: {lineItem.product.name} || 
                Price: ${lineItem.product.price / 100} || 
                Qty: {lineItem.qty}
              </li>
            )})
            }
          </ul>
        </div>
        <button type="button" onClick={() => props.history.push("/")}>Home</button>
      </div>
    )
  }
  return (<div>Loading...</div>)
}

const mapStateToProps = (state, ownProps) => ({
  order: state.orders.filter(order => order.id === ownProps.props.match.params.orderId).pop(),
  props: ownProps.props
})

export default connect(mapStateToProps)(Confirmation);

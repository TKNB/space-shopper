import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';

import ordersReducer from '../store/orders';

const Confirmation = ({ order, props }) => {
  if (order) {
    return (
      <div id="confirmation">
        <h2>Wow! That order was out of this world!</h2>
        <br />
        <p>Confirmation Code: {order.id}</p>
        <hr />
        <h3>Your Stuff</h3>
        <div id="orderItems">
          {
            order.lineItems.map(lineItem => {
              return (
                <Card key={lineItem.id}>
                  <CardImg className='rotate' width="100%" src={lineItem.product.imageUrl} alt={lineItem.product.name} />
                  <CardBody>
                    <CardTitle>{lineItem.product.name}</CardTitle>
                    <CardText>
                      Price: ${lineItem.product.price / 100}
                      <br />
                      Qty: {lineItem.qty}
                    </CardText>
                  </CardBody>
                </Card>
              )
            })
          }
        </div>
        <Button type="button" onClick={() => props.history.push("/")}>Home</Button>
      </div>
    )
  }
  return (<div>Loading...</div>)
}

const mapStateToProps = (state, ownProps) => ({
  order: state.orders.filter(_order => _order.id === ownProps.props.match.params.orderId).pop(),
  props: ownProps.props
})

export default connect(mapStateToProps)(Confirmation);

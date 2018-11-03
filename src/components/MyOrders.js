import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
} from 'reactstrap';

const MyOrders = ({ orders }) => {
  return (
    <div>
      <h2>MyOrders</h2>
      {orders.map(order => {
        return (
          <div key={order.id}>
            <hr />
            <h3>Your order from: {order.createdAt.slice(0, 10)}</h3>
            <div  id="orderItems">
              {
              order.lineItems.map(lineItem => { return (
                <Card key={lineItem.id}>
                  <CardImg width="100%" src={lineItem.product.imageUrl} alt={lineItem.product.name} />
                  <CardBody>
                    <CardTitle>{lineItem.product.name}</CardTitle>
                    <CardText>
                      Price: ${lineItem.product.price / 100}
                      <br/>
                      Qty: {lineItem.qty}
                    </CardText>
                  </CardBody>
                </Card>
              )})
              }
            </div>
          </div>
        );
      })}
      <hr />
    </div>
  );
};

const mapStateToProps = ({ auth, orders }) => {
  return {
    auth,
    orders: orders.filter(order => order.userId === auth.id),
  };
};

export default connect(mapStateToProps)(MyOrders);

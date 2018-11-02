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
      <hr />
      <h2>MyOrders</h2>
      {console.log(orders)}
      {orders.map(order => {
        return (
          <div key={order.id}>
            <h3>Your order from: {order.createdAt.slice(0, 10)}</h3>
            <CardDeck>
              {order.lineItems.map(lineItem => {
                return (
                  <Card key={lineItem.id} className="flexContainer">
                    <CardImg
                      className="card"
                      top
                      width="100%"
                      src={lineItem.product.imageUrl}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle>{lineItem.product.name}</CardTitle>
                      <CardSubtitle>QTY: {lineItem.qty}</CardSubtitle>
                      <CardText>{lineItem.product.description}</CardText>
                    </CardBody>
                  </Card>
                );
              })}
            </CardDeck>
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

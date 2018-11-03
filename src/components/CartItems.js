import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';

import { updateLineItem } from '../store/cart';

const CartItems = ({ lineItem, updateLineItem }) => {
  const { product } = lineItem;
  return (
      <Card>
        <CardImg width="100%" src={product.imageUrl} alt={product.name} />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardText>
            Price: ${product.price / 100}
            <br/>
            Qty: {lineItem.qty}
          </CardText>
          <Button type="button" onClick={() => updateLineItem(lineItem.id, {qty: 1 + lineItem.qty})}> + </Button>
          <Button type="button" onClick={() => updateLineItem(lineItem.id, {qty: -1 + lineItem.qty})}> - </Button>
        </CardBody>
      </Card>
  )
}

const mapDispatchToProps = (dispatch) => ({
  updateLineItem: (lineItemId, data) => dispatch(updateLineItem(lineItemId, data))
})

export default connect(null, mapDispatchToProps)(CartItems);

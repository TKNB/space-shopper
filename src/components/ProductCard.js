import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { addToCart } from '../store/cart';

const ProductCard = ({ product, addToCart, changeAlert }) => {
  return (
    <Card>
      <CardTitle className='cardTitle'>{product.name}</CardTitle>
      <CardBody>
        <CardImg className='card' src={product.imageUrl} alt={`${product.name} image`} />
        <Link to={`/product/${product.id}`} replace>
          <Button>View</Button>
        </Link>
        <Button onClick={() => {
          addToCart(product, 1, history)
          changeAlert(product.name)
        }}>Add to Cart</Button>
      </CardBody>
    </Card >
  )
}

const mapDispatchToProps = dispatch => ({
  addToCart: (product, qty, history) => dispatch(addToCart(product, qty, history)),
})

export default connect(null, mapDispatchToProps)(ProductCard);

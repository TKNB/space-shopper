import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import { addToCart } from '../store/orders';

const ProductDetail = ({ product, cart, addToCart }) => {
  if (!product) return null;
  return (
    <div>
      <Link to='/'>
        <Button>Back</Button>
      </Link>
      <div className='flexContainer detailCard'>
        <Card>
          <CardTitle className='cardTitle'>{product.name}</CardTitle>
          <CardBody>
            <CardSubtitle>Price: ${product.price}</CardSubtitle>
            <CardText>Description: {product.description}</CardText>
            <CardText>Vendor: {product.userId}</CardText>
            <Link to={'/cart'} replace>
              <Button onClick={() => addToCart(cart, product)}>Add to Cart</Button>
            </Link>
          </CardBody>
          <CardImg className='card detail' src={product.imageUrl} alt={`${product.name} image`} />
        </Card>
      </div>
    </div >
  )
}

const mapStateToProps = ({ orders }) => {
  const cart = orders.find(order => !order.complete);
  //find product owner
  return {
    cart,
  }
}

const mapDispatchToProps = dispatch => ({
  addToCart: (cart, product) => dispatch(addToCart(cart, product)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

//DELETE COMPONENTS BELOW TO BE ADDED TO EDIT PAGE
// import { deleteProduct } from '../store/products';

// {/* <Button onClick={() => {
//             if (confirm('Send into oblivion?')) { deleteProduct(product) }
//           }}>Delete
//           </Button> */}

// const mapDispatchToProps = (dispatch, { history }) => ({
//   //deleteProduct: product => dispatch(deleteProduct(product, history)),
// })

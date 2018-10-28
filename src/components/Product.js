import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button,
} from 'reactstrap';
import { deleteProduct } from '../store/products';

const Product = ({ product, deleteProduct }) => {
  return (
    <div>
      <Card className='card'>

        <CardHeader className='featured'>Featured</CardHeader>
        <CardImg top width="50%" src={product.imageUrl} alt={`${product.name} image`} />

        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardSubtitle>${product.price}</CardSubtitle>
          <CardText>{product.description}</CardText>

          <Link to={`products/${product.id}`} replace>Product Details</Link>
          <Button>Add to Cart</Button>
          <Button onClick={() => {
            if (confirm('Send into oblivion?')) { deleteProduct(product) }
          }}>Delete
          </Button>

        </CardBody>
      </Card>
    </div>
  )
}

const mapDispatchToProps = (dispatch, { history }) => ({
  deleteProduct: product => dispatch(deleteProduct(product, history)),
})

export default connect(null, mapDispatchToProps)(Product);

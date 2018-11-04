import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

import { addToCart } from '../store/cart';
import { currency } from '../../utils/formatter';

class ProductDetail extends Component {
  constructor({product}) {
    super({product})
    this.state = {
      product
    }
  }
  componentDidUpdate (prevProps) {
    if (prevProps.cart !== this.props.cart) {
      console.log('!!!----CART1---!!!')
      this.setState({
        cart: this.props.cart,
        auth: this.props.auth
      })
    }
  }
  render () { 
    const {product, addToCart, isLoggedIn, history } = this.props;
    if (!product) return null;
    return (
      <div>
        <Link to='/'>
          <Button>Back</Button>
        </Link>
        <div className='flexContainer detailCard'>
          <Card>
            <CardTitle className='cardTitle'>{product.name}</CardTitle>
            <CardImg src={product.imageUrl} alt={`${product.name} image`} />
            <CardBody>
              <CardSubtitle>Price: {currency.format(product.price / 100)}</CardSubtitle>
              <br />
              <Button onClick={() => addToCart( product, 1, history)}>Add to Cart</Button>
              <br />
              <br />
              <CardText>Description: {product.description}</CardText>
              <CardText>Vendor: {product.userId}</CardText>
              {isLoggedIn === product.userId ? (
                <Link to={`/edit/product/${product.id}`}>
                  <Button>Edit Product</Button>
                </Link>
              ) : null }
            </CardBody>
          </Card>
        </div>
      </div >
    )
  }
}

const mapStateToProps = ({ auth, products}, {history, id} ) => {
  const product = products.filter( product => product.id === id).pop();
  //find product owner
  return {
    isLoggedIn: auth.id,
    history,
    product,
  }
}

const mapDispatchToProps = dispatch => ({
  addToCart: ( product, qty, history ) => dispatch(addToCart( product, qty, history )),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

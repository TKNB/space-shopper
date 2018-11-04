import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

import { addToCart } from '../store/cart';
import { currency } from '../../utils/formatter';
import ReviewCard from './ReviewCard';
import ProductAlert from './ProductAlert';

class ProductDetail extends Component {
  constructor({ product, user }) {
    super({ product, user })
    this.state = {
      product,
      user,
      alert: '',
      qty: 1
    }
    this.onChangeAlert = this.onChangeAlert.bind(this);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      console.log('!!!----CART1---!!!');
      this.setState({
        cart: this.props.cart,
        auth: this.props.auth,
      });
    }
  }

  onChangeAlert(name) {
    this.setState({
      alert: `Added ${name} to cart!`
    })
  }

  render() {
    const { product, addToCart, isLoggedIn, history, user } = this.props;
    const { qty, alert } = this.state;
    const { onChangeAlert } = this;
    if (!product || !user) return null;
    return (
      <div>
        <ProductAlert alert={alert} />
        <Link to='/'>
          <Button>Back</Button>
        </Link>
        <div className="flexContainer detailCard">
          <Card>
            <CardTitle className="cardTitle">{product.name}</CardTitle>
            <CardImg src={product.imageUrl} alt={`${product.name} image`} />
            <CardBody>
              <CardSubtitle>
                <div>Price: {currency.format((product.price * qty) / 100)}</div>
                Quantity: {qty}
              </CardSubtitle>
              <br />
              <Button
                type="button"
                onClick={() => this.setState({ qty: qty + 1 })}
              >
                {' '}
                +{' '}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  if (qty > 1) this.setState({ qty: qty - 1 });
                }}
              >
                {' '}
                -{' '}
              </Button>
              <Button onClick={() => {
                onChangeAlert(product.name)
                addToCart(product, 1, history)
              }}>
              Add to Cart
              </Button>
              <br />
              <br />
              <CardText>Description: {product.description}</CardText>
              <CardText>Vendor: {user.username}</CardText>
              {isLoggedIn === product.userId ? null : (
                <Link to={`/edit/product/${product.id}`}>
                  <Button>Edit Product</Button>
                </Link>
              )}
            </CardBody>
          </Card>
          {product.reviews.map(review => {
            return <ReviewCard key={review} review={review} user={user} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, products, users }, { history, id }) => {
  const product = products.filter(product => product.id === id).pop();
  const user = users.filter(user => user.id === product.userId).pop();
  //find product owner
  return {
    isLoggedIn: auth.id,
    history,
    product,
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  addToCart: (product, qty, history) =>
    dispatch(addToCart(product, qty, history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardDeck } from 'reactstrap';

import { addToCart } from '../store/cart';
import ProductCard from './ProductCard';
import ProductAlert from './ProductAlert';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      alert: '',
    }
    this.onChangeAlert = this.onChangeAlert.bind(this);
  }

  onChangeAlert(name) {
    this.setState({
      alert: `Added ${name} to cart!`
    })
  }

  render() {
    const { myProducts, featuredProducts } = this.props;
    const { alert } = this.state;
    const { onChangeAlert } = this;
    return (
      <div >
        <ProductAlert alert={alert} />
        <h3 className='featured'>Featured Products</h3>
        <p className='byline'>Each finely crafted in the crucible of the universe.</p>
        <CardDeck className='flexContainer'>
          {featuredProducts.map(product => <ProductCard key={product.id} product={product} changeAlert={onChangeAlert} />)}
        </CardDeck>

        <hr />

        <h3 className='subtitle'>My Products ({myProducts.length})</h3>
        <CardDeck className='flexContainer'>
          {myProducts.map(product => <ProductCard key={product.id} product={product} changeAlert={onChangeAlert} />)}
        </CardDeck>
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  addToCart: (product, qty, history) => dispatch(addToCart(product, qty, history)),
})

export default connect(null, mapDispatchToProps)(Home);

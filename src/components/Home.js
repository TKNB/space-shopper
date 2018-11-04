import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardDeck, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { addToCart } from '../store/cart';
import ProductCard from './ProductCard';

//could DRY this up later with something like ShowProducts component

class Home extends Component {
  render() {
    const { myProducts, featuredProducts, history, addToCart } = this.props;
    return (
      <div >
        <h3 className='featured'>Featured Products</h3>
        <p className='byline'>Each finely crafted in the crucible of the universe.</p>
        <CardDeck className='flexContainer'>
          {featuredProducts.map(product => <ProductCard key={product.id} product={product} history={history} />)}
        </CardDeck>
        <br />
        <Link to="/products"><Button>  View All Products  </Button></Link>
        <hr />

        <h3 className='subtitle'>My Products ({myProducts.length})</h3>
        <CardDeck className='flexContainer'>
          {myProducts.map(product => <ProductCard key={product.id} product={product} history={history} />)}
        </CardDeck>
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  addToCart: ( product, qty, history ) => dispatch(addToCart( product, qty, history )),
})

export default connect(null, mapDispatchToProps)(Home);

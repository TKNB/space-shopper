import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card, CardImg, CardBody, CardTitle, Button, CardDeck
} from 'reactstrap';

import { addToCart } from '../store/cart';

//could DRY this up later with something like ShowProducts component

class Home extends Component {
  render() {
    const { myProducts, featuredProducts, history, addToCart } = this.props;
    return (
      <div >
        <h3 className='featured'>Featured Products</h3>
        <p className='byline'>Each finely crafted in the crucible of the universe.</p>
        <CardDeck className='flexContainer'>
          {featuredProducts.map(product => {
            return (
              <div key={product.id} >
                <Card>
                  <CardTitle className='cardTitle'>{product.name}</CardTitle>
                  <CardBody>
                    <CardImg className='card' src={product.imageUrl} alt={`${product.name} image`} />
                    <Link to={`/product/${product.id}`} replace>
                      <Button>View</Button>
                    </Link>
                    <Button onClick={() => addToCart( product, 1, history )}>Add to Cart</Button>
                  </CardBody>
                </Card>
              </div>
            )
          })}
        </CardDeck>

        <hr />

        <h3 className='subtitle'>My Products ({myProducts.length})</h3>
        <CardDeck className='flexContainer'>
          {myProducts.map(product => {
            return (
              <div key={product.id} >
                <Card>
                  <CardTitle className='cardTitle'>{product.name}</CardTitle>
                  <CardBody>
                    <CardImg className='card' src={product.imageUrl} alt={`${product.name} image`} />
                    <Link to={`/product/${product.id}`} replace>
                      <Button>View</Button>
                    </Link>
                  </CardBody>
                </Card>
              </div>
            )
          })}
        </CardDeck>
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  addToCart: ( product, qty, history ) => dispatch(addToCart( product, qty, history )),
})

export default connect(null, mapDispatchToProps)(Home);

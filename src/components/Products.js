import React from 'react';
import { connect } from 'react-redux';
import { CardDeck} from 'reactstrap';

import ProductCard from './ProductCard';

const Products = ({ products }) => {
  if (products) {
    return (
      <div>
        <h2>Products</h2>
        <CardDeck className='flexContainer'>
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </CardDeck>
      </div>
    )
  }
  else {
    return <div></div>
  }
};

const mapStateToProps = ({ products }) => ({ products });

export default connect(mapStateToProps)(Products);

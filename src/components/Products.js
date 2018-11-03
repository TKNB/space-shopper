import React from 'react';
import { connect } from 'react-redux';
import { CardDeck} from 'reactstrap';

import ProductCard from './ProductCard';

export default ({ products }) => {
  return (
    <div>
      <h2>Products</h2>
      <CardDeck className='flexContainer'>
        {products.map(product => <ProductCard key={product.id} product={product} />)}
      </CardDeck>
    </div>
  )
};

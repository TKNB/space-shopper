import React from 'react';
import { connect } from 'react-redux';
import Product from './Product';

const Products = ({ products }) => {
  return (
    <div>
      <h2>Products</h2>
      <p className='byline'>Each finely crafted in the crucible of the Milky Way.</p>
      {products.map(product => <Product key={product.id} product={product} />)}
    </div>
  )
};

const mapStateToProps = ({ products }) => ({ products });

export default connect(mapStateToProps)(Products);

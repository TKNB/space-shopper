import React from 'react';
import { connect } from 'react-redux';
import ProductDetail from './ProductDetail';

const Products = ({ products }) => {
  return (
    <div>
      <h2>Products</h2>
      {products.map(product => <ProductDetail key={product.id} product={product} />)}
    </div>
  )
};

const mapStateToProps = ({ products }) => ({ products });

export default connect(mapStateToProps)(Products);

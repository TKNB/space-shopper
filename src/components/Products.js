import React from 'react';
import { connect } from 'react-redux';
import { CardDeck} from 'reactstrap';
import queryString from 'query-string'

import ProductCard from './ProductCard';

const Products = ({ products, history, category }) => {
  if (products) {
    return (
      <div>
        <h2>Products{ category ? `: ${category.name}` : null}</h2>
        <CardDeck className='flexContainer'>
          {products.map(product => <ProductCard key={product.id} product={product} history={history} />)}
        </CardDeck>
      </div>
    )
  }
  else {
    return <div></div>
  }
};

const mapStateToProps = ({ products, categories }, { location }) => {
  console.log(location)
  const queries = queryString.parse(location.search);
  console.log(queries)
  const category = queries.category ? categories.find(_category => _category.name === queries.category) : null;
  console.log(category)
  if ( category ) {
    products = products.filter(product => product.categoryId === category.id);
  }
  return {
    products,
    category
  }
}

export default connect(mapStateToProps)(Products);

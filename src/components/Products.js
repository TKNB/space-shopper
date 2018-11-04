import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardDeck} from 'reactstrap';
import queryString from 'query-string'

import ProductCard from './ProductCard';

class Products extends Component {
  constructor(props) {
    super(props);
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
    const { products, category, history } = this.props;
    if (products) {
      return (
        <div>
          <h2>Products{ category ? `: ${category.name}` : null}</h2>
          <CardDeck className='flexContainer'>
            {products.map(product => <ProductCard changeAlert={this.onChangeAlert} key={product.id} product={product} history={history} />)}
          </CardDeck>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}

const mapStateToProps = ({ products, categories }, { location }) => {
  let queries;
  let category;
  if (location.search) {
    queries = queryString.parse(location.search);
    category = queries.category ? categories.find(_category => _category.name === queries.category) : null;
  }
  console.log(location)
  console.log(queries)
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

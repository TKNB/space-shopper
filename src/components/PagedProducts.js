import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadProducts } from '../store/products';
import Products from './Products';

class PagedProducts extends Component {
  componentDidMount() { this.props.loadProducts(this.props.index) };

  componentDidUpdate(prevProps) {
    if (prevProps.index !== this.props.index) {
      this.props.loadProducts(this.props.index);
    }
  }

  render() {
    const { products, pager } = this.props;
    return (
      <div>
        <Products products={products} pager={pager} />
        <ul>
          {
            pager.map(page => {
              if (page.selected) {
                return (
                  <li key={page.text}>{page.text}</li>
                );
              }
              return (
                <li key={page.text}>
                  <Link to={`/products/page/${page.value}`}>
                    {page.text}
                  </Link>
                </li>
              );
            })

          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ products, productCount }, { match }) => {
  const index = match.params.index * 1;
  const pageSize = 2;
  const totalPages = Math.ceil(productCount / pageSize);
  const pager = [];
  for (let i = 0; i < totalPages; i++) {
    pager.push({
      text: i + 1,
      value: i,
      selected: i === index
    })
  }
  return {
    products,
    index,
    pager,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProducts: index => dispatch(loadProducts(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PagedProducts);

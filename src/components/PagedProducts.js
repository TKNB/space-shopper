import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    const { products, pager, index } = this.props;
    let isActive = '';
    return (
      <div >
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {
              pager.map(page => {
                if (page.selected) {
                  isActive = 'page-item selectedPage';
                } else {
                  isActive = 'page-item'
                }
                return (
                  <li className={isActive} key={page.text}>
                    <Link to={`/products/page/${page.value}`}>
                      {page.text}
                    </Link>
                  </li>
                );
              })

            }
          </ul>
        </nav>
        <h5>Page {index + 1}</h5>
        <Products products={products} pager={pager} />
      </div>
    )
  }
}

const mapStateToProps = ({ products, productsCount }, { match }) => {
  const index = match.params.index * 1;
  const pageSize = 3;
  const totalPages = Math.ceil(productsCount / pageSize);
  const pager = [];
  for (let i = 0; i < totalPages; i++) {
    pager.push({
      text: i + 1,
      value: i,
      selected: i === index
    })
  }
  console.log('*****************', productsCount, index, pager)
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

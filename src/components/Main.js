import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom'

import { loadProducts } from '../store/products';

import Login from './Login';
import Products from './Products';

class Main extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    return (
      <div>
        <Products />

        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/products" component={Products} />
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => ({ products });

const mapDispatchToProps = (dispatch) => ({
  loadProducts: () => dispatch(loadProducts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);

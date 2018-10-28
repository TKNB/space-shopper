import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom'

import { loadProducts } from '../store/products';

import Login from './Login';
import Products from './Products';
import EditProduct from './EditProduct';

class Main extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/products" component={Products} />
            <Route path="/edit/product/:id" render={ ({match}) => <EditProduct id={match.params.id} /> } />
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
/* eslint-disable react/prefer-stateless-function */ // REMOVE ME EVENTUALLY

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom'

import Login from './Login';
import Cart from './Cart';

import { getOrders } from '../store/orders';

class Main extends Component {
  componentDidMount () {
    this.props.getOrders();
  }
  
  render () {
    return (
      <Router>
        <div id="app">
          <Route path="/" component={Login} />
          <Route path="/cart" component={Cart} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  getOrders: () => dispatch(getOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom'

import { exchangeTokenForAuth } from '../store/auth';
import { loadProducts } from '../store/products';
import { getOrders } from '../store/orders';
import Login from './Login';
import Products from './Products';
import EditProduct from './EditProduct';
import NavBar from './NavBar';
import Signup from './Signup';
import Cart from './Cart';
import AddProduct from './AddProduct';

class Main extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    console.log(this.props.auth);
    return (
      <div>
        <Router>
          <div>
            <Route path="/" component={NavBar} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products" component={Products} />
            <Route path="/add_product" component={AddProduct} />
            <Route path="/edit/product/:id" render={ ({match, history}) => <EditProduct history={history} id={match.params.id} /> } />
            <Route path="/cart" component={Cart} />
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => {
  // adding token exchange to init(), to keep user logged in after hard refresh
  return {
    init: () => {
    dispatch(exchangeTokenForAuth());
    dispatch(loadProducts());
    dispatch(getOrders());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

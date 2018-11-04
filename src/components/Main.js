import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import { loadProducts } from '../store/products';
import { loadProductsCount } from '../store/productsCount';
import { getOrders } from '../store/orders';
import { getCart } from '../store/cart';
import { getUsers } from '../store/users';
import { getCategories } from '../store/categories';
import { exchangeTokenForAuth } from '../store/auth';

import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import NavBar from './NavBar';
import Products from './Products';
import PagedProducts from './PagedProducts';
import ProductDetail from './ProductDetail';
import EditProduct from './EditProduct';
import Cart from './Cart';
import MyOrders from './MyOrders';
import Account from './Account';
import Confirmation from './Confirmation';
import AddProduct from './AddProduct';
import HelloWorld from './HelloWorld';

class Main extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { myProducts, featuredProducts, products } = this.props;
    return (
      <div>
        <Router>
          <div>
            <Route path="/hello" component={HelloWorld} />
            <Route component={NavBar} />
            <Route
              exact
              path="/"
              render={({ history }) => (
                <Home
                  myProducts={myProducts}
                  featuredProducts={featuredProducts}
                  history={history}
                />
              )}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/account" component={Account} />
            <Route path="/my_orders" component={MyOrders} />

            <Route
              exact
              path="/products/page/:index?"
              component={PagedProducts}
            />

            <Route path="/products" render={({ location }) => <Products location={location} />} />

            <Route path="/add_product" component={AddProduct} />
            <Route
              path="/edit/product/:id"
              render={({ match, history }) => (
                <EditProduct history={history} id={match.params.id} />
              )}
            />
            <Route
              path="/product/:id"
              render={({ match, history }) => (
                <ProductDetail history={history} id={match.params.id} />
              )}
            />
            <Route
              path="/cart"
              render={({ match, history }) => <Cart history={history} />}
            />
            <Route
              path="/confirmation/:orderId"
              render={props => <Confirmation props={props} />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ products, auth }) => {
  const featuredProducts = products.filter(product => product.featured);
  //temporary hardcoding below until we get users
  const myProducts = products.filter(
    product => product.userId === 'c211e173-5346-4044-a2a3-9109460c6d47'
  );
  return {
    auth,
    myProducts,
    featuredProducts,
    products,
  };
};

const mapDispatchToProps = dispatch => {
  // adding token exchange to init(), to keep user logged in after hard refresh
  return {
    init: () => {
      dispatch(exchangeTokenForAuth());
      dispatch(loadProducts());
      dispatch(loadProductsCount());
      dispatch(getOrders());
      dispatch(getUsers());
      dispatch(getCategories());
      // dispatch(getCart());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

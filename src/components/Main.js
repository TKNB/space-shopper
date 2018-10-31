import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import { loadProducts } from '../store/products';
import { getOrders } from '../store/orders';
import { exchangeTokenForAuth } from '../store/auth';

import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import NavBar from './NavBar';
import Products from './Products';
import ProductDetail from './ProductDetail';
import EditProduct from './EditProduct';
import Cart from './Cart';

import Account from './Account';
import Confirmation from './Confirmation';
import AddProduct from './AddProduct';


class Main extends Component {
  componentDidMount() { this.props.init() }

  render() {
    const { myProducts, featuredProducts } = this.props;
    return (
      <div>
        <Router>
          <div>
            <Route component={NavBar} />
            <Route exact path="/" component={() => <Home myProducts={myProducts} featuredProducts={featuredProducts} />} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/account" component={Account} />
            <Route path="/products" component={Products} />
            <Route path="/add_product" component={AddProduct} />
            <Route path="/edit/product/:id" render={ ({match, history}) => <EditProduct history={history} id={match.params.id} /> } />
            <Route path="/product/:id" render={({ match }) => {
              const productDetail = myProducts.find(product => product.id === match.params.id);
              return <ProductDetail product={productDetail} />
            }} />
            <Route path="/featured/product/:id" render={({ match }) => {
              const productDetail = featuredProducts.find(product => product.id === match.params.id);
              return <ProductDetail product={productDetail} />
            }} />
            <Route path="/cart" component={Cart} />
            <Route path="/confirmation/:orderId" render={(props) => <Confirmation props={props} />} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ products, auth }) => {
  const featuredProducts = products.filter(product => product.featured)
  //temporary hardcoding below until we get users
  const myProducts = products.filter(product => product.userId === 'c211e173-5346-4044-a2a3-9109460c6d47')
  return {
    auth,
    myProducts,
    featuredProducts,
  }
};

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

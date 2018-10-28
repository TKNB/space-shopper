import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Signup from './Signup';
import { exchangeTokenForAuth } from '../store/auth';
import { loadProducts } from '../store/products';
import Products from './Products';

class Main extends Component {
  componentDidMount() {
    this.props.init();
  }
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={NavBar} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/products" component={Products} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => {
  // adding token exchange to init(), to keep user logged in after hard refresh
  return {
    init: () => {
    dispatch(exchangeTokenForAuth()),
    dispatch(loadProducts()),
    })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

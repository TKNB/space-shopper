/* eslint-disable react/prefer-stateless-function */ // REMOVE ME EVENTUALLY

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import Login from './Login';
import NavBar from './NavBar';
import Signup from './Signup';
import { exchangeTokenForAuth } from '../store/auth';

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
    init: () => dispatch(exchangeTokenForAuth()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

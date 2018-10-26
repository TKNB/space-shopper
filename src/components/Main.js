/* eslint-disable react/prefer-stateless-function */ // REMOVE ME EVENTUALLY

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom'

import Login from './Login';

class Main extends Component {
  render () {
    return (
      <Router>
          <Route path="/" component={Login} />
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Main);

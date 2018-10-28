import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/auth';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      error: '',
      signedUp: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    return (
      this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0
    );
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { username, password, firstName, lastName } = this.state;
    axios
      .post('/api/users', { username, password, firstName, lastName })
      .then(() => this.setState({ signedUp: true }))
      .catch(ex => console.log('Server Error'));
  }
  render() {
    const {
      username,
      password,
      error,
      firstName,
      lastName,
      signedUp,
    } = this.state;
    if (signedUp) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="firstName" bsSize="large">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              autoFocus
              type="name"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="large">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              autoFocus
              type="name"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup
            controlId="password"
            bsSize="large"
            validationState={error === '' ? null : 'error'}
          >
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={password}
              name="password"
              onChange={this.handleChange}
              type="password"
            />
            {error === '' ? null : <ControlLabel>{error}</ControlLabel>}
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => dispatch(login(credentials)),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Signup);

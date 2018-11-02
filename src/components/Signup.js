import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/auth';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
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
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>First Name</Label>
            <Input
              autoFocus
              type="name"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
              autoFocus
              type="name"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              autoFocus
              type="email"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              invalid={error !== ''}
              value={password}
              name="password"
              onChange={this.handleChange}
              type="password"
            />
            {error === '' ? null : <FormFeedback>{error}</FormFeedback>}
          </FormGroup>
          <Button disabled={!this.validateForm()} type="submit">
            Register
          </Button>
        </Form>
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

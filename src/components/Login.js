import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/auth';
import { Redirect, Link } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    this.props
      .login({ username, password })
      .catch(ex => this.setState({ error: 'Bad Credentials!' }));
  }
  render() {
    const { username, password, error } = this.state;
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
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
              invalid
              value={password}
              name="password"
              onChange={this.handleChange}
              type="password"
            />
            {error === '' ? null : <FormFeedback>{error}</FormFeedback>}
          </FormGroup>
          
          <Button disabled={!this.validateForm()} type="submit">
            Login
          </Button>
          <br />
          <br />
          <Link to="/signup">
            New astronaut? Sign up.
          </Link>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    isLoggedIn: auth.id,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: credentials => dispatch(login(credentials)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

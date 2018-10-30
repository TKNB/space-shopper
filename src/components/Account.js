import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import axios from 'axios';
import { editUser } from '../store/users';
class Account extends Component {
  constructor(auth) {
    super(auth);
    this.state = {
      id: this.props.auth.id,
      username: this.props.auth.username,
      firstName: this.props.auth.firstName,
      lastName: this.props.auth.lastName,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputValidate = this.inputValidate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      const { firstName, lastName, username, id } = nextProps.auth;
      this.setState({ firstName, lastName, username, id });
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.editUser(this.state).catch(ex => console.log('Server Error'));
  }
  inputValidate() {
    const { firstName, lastName, username } = this.props.auth;
    return (
      username !== this.state.username ||
      firstName !== this.state.firstName ||
      lastName !== this.state.lastName
    );
  }
  render() {
    const { username, firstName, lastName } = this.state;
    console.log(this.props.auth.firstName);
    return (
      <div>
        <hr />
        <h2>MyOrders</h2>
        <hr />
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
            <Button
              block
              bsSize="large"
              type="submit"
              disabled={!this.inputValidate()}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editUser: user => dispatch(editUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
            <Button type="submit" disabled={!this.inputValidate()}>
              Update
            </Button>
          </Form>
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

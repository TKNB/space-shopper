import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addProduct } from '../store/products'
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';


class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      product: {
        name: '',
        description: '',
        price: 0,
      },
      warning: false,
      file: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.submitChange = this.submitChange.bind(this)
  }
  handleChange(e) {
    let product = this.state.product
    product[e.target.name] = e.target.value*1 ? e.target.value*1 : e.target.value
    this.setState({
      product
    })
  }
  handleFileUpload(e) {
    this.setState({file: e.target.files[0]});
  }
  submitChange(e) {
    e.preventDefault()
    if(isNaN(this.state.product.price)) {
      this.setState({
        warning: true
      })
    } else {
      const product = this.state.product;
      product.userId = this.props.auth.id;
      this.props.addProduct( product, this.state.file, this.props.history )
    }
  }
  render() {
    const { handleChange, submitChange } = this
    const { name, description, price, imageUrl } = this.state.product
    const { warning } = this.state
    return (
      <div id="editForm">
        <h1>Add Product</h1>
        <FormGroup controlId="formImage" >
          <ControlLabel>Image</ControlLabel>
          <FormControl type='file' onChange={this.handleFileUpload} />
        </FormGroup>
        <form onSubmit={submitChange}>
          <FormGroup controlId="formName" >
            <ControlLabel>Name</ControlLabel>
            <FormControl autoFocus type="text" name="name" value={name} onChange={handleChange} />
          </FormGroup>
          <FormGroup controlId="formDescription">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" name="description" value={description} onChange={handleChange} />
          </FormGroup>
          <FormGroup controlId="formPrice" >
            <ControlLabel>Price ($)</ControlLabel>
            <FormControl type="text" name="price" value={price} onChange={handleChange} />
          </FormGroup>
          <Button block bsSize="large" type="submit" >
            ADD PRODUCT
          </Button>
          {warning ? 
          <Alert bsStyle="danger">
            <strong>Error!</strong> Please make sure price is a number.
          </Alert> : null }
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return ({
      auth
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product, file, history) => dispatch(addProduct(product, file, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
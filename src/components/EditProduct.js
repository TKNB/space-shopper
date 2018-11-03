import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProduct, deleteProduct } from '../store/products'
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';

class EditProduct extends Component {
  constructor({ product }) {
    super()
    this.state = {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl
      },
      warning: false,
      file: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.submitChange = this.submitChange.bind(this)
    this._deleteProduct = this._deleteProduct.bind(this)
  }
  handleChange(e) {
    let product = this.state.product
    product[e.target.name] = e.target.value * 1 ? e.target.value * 1 : e.target.value
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
      this.props.updateProduct(this.state.product, this.state.file )
    }
  }
  _deleteProduct(e) {
    e.preventDefault()
    this.props.deleteProduct( this.state.product, this.props.history )
  }
  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      this.setState({
        product: this.props.product,
      })
    }
  }
  render() {
    const { handleChange, submitChange, _deleteProduct } = this
    const { name, description, price, imageUrl } = this.state.product
    const { warning } = this.state
    return (
      <div id="editForm">
        <h1>Edit {this.props.product ? this.props.product.name : ''}</h1>
        <img width="50%" src={imageUrl} alt={`${name} image`} />
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
            UPDATE PRODUCT
          </Button>
        </form>
        <Button block bsSize="large" type="submit"  onClick={_deleteProduct}>
          DELETE PRODUCT
        </Button>
        {warning ? 
        <Alert bsStyle="danger">
          <strong>Error!</strong> Please make sure price is a number.
        </Alert> : null }
      </div>
    );
  }
}

const mapStateToProps = ({ products }, ownProps) => {
  const _product = products.filter( product => product.id === ownProps.id)
  if (_product.length < 1) {
    return ({
      product: {
        id: 0,
        name: '',
        description: '',
        price: 0,
        imageUrl: ''
      }
    })
  }
  return ({
    product: _product.pop()
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (product, file) => dispatch(updateProduct(product, file)),
    deleteProduct: (id, history) => dispatch(deleteProduct(id, history)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProduct } from '../store/products'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

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
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitChange = this.submitChange.bind(this)
  }
  handleChange(e) {
    let product = this.state.product
    product[e.target.name] = e.target.value * 1 ? e.target.value * 1 : e.target.value
    this.setState({
      product
    })
  }
  submitChange(e) {
    e.preventDefault()
    this.props.updateProduct(this.state.product)
  }
  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      this.setState({
        product: this.props.product
      })
    }
  }
  render() {
    const { handleChange, submitChange } = this
    const name = this.state.product.name ? this.state.product.name : ''
    const description = this.state.product.description ? this.state.product.description : ''
    const price = this.state.product.price ? this.state.product.price : ''
    const imageUrl = this.state.product.imageUrl ? this.state.product.imageUrl : ''
    return (
      <div id="editForm">
        <h1>Edit {this.props.product ? this.props.product.name : ''}</h1>
        <img width="50%" src={imageUrl} alt={`${name} image`} />
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
      </div>
    );
  }
}

const mapStateToProps = ({ products }, ownProps) => {
  const _product = products.filter(product => product.id === ownProps.id)
  if (_product.length < 1) {
    console.log(products)
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
  console.log('Found product.')
  return ({
    product: products.filter(product => product.id === ownProps.id)[0]
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);

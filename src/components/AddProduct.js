import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addProduct } from '../store/products'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';


class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      product: {
        name: '',
        description: '',
        price: 0,
        // Static image URL for now.  Will add AWS functionality later
        imageUrl: 'https://i5.walmartimages.com/asr/cb205672-887b-4a98-a8e9-58043efe7740_1.5a29df2e9cacc80b5ef85eeefe7564fb.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'
      },
      warning: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitChange = this.submitChange.bind(this)
  }
  handleChange(e) {
    let product = this.state.product
    product[e.target.name] = e.target.value*1 ? e.target.value*1 : e.target.value
    this.setState({
      product
    })
  }
  submitChange(e) {
    e.preventDefault()
    if(isNaN(this.state.product.price)) {
      this.setState({
        warning: true
      })
    } else {
      this.props.addProduct( this.state.product, this.props.history )
    }
  }
  render() {
    const { handleChange, submitChange } = this
    const name = this.state.product.name
    const description = this.state.product.description
    const price = this.state.product.price
    const imageUrl = this.state.product.imageUrl
    return (
      <div id="editForm">
        <h1>Add Product</h1>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product, history) => dispatch(addProduct(product, history))
  }
}

export default connect(null, mapDispatchToProps)(AddProduct);
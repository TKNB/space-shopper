import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addProduct } from '../store/products'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap';


class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      product: {
        name: '',
        description: '',
        price: null,
        categoryId: null,
        featured: null,
      },
      warning: false,
      warningImage: false,
      warningName: false,
      warningDescription: false,
      warningCategory: false,
      warningFeatured: false,
      file: null
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
    let valid = true;
    if(isNaN(this.state.product.price) || this.state.product.price === null) {
      valid = false;
      this.setState({
        warning: true
      })
    } else if(this.state.warning){
      this.setState({
        warning: false
      })
    }
    if(this.state.product.name.length < 3) {
      valid = false;
      this.setState({
        warningName: true
      })
    } else if(this.state.warningName){
      this.setState({
        warningName: false
      })
    }
    if(this.state.product.description.length < 3) {
      valid = false;
      this.setState({
        warningDescription: true
      })
    } else if(this.state.warningDescription){
      this.setState({
        warningDescription: false
      })
    }
    if(this.state.product.categoryId === null) {
      valid = false;
      this.setState({
        warningCategory: true
      })
    } else if(this.state.warningCategory){
      this.setState({
        warningCategory: false
      })
    }
    if(this.state.product.featured === null) {
      valid = false;
      this.setState({
        warningFeatured: true
      })
    } else if(this.state.warningFeatured){
      this.setState({
        warningFeatured: false
      })
    }
    if(!this.state.file) {
      valid = false;
      this.setState({
        warningImage: true
      })
    } else {
      console.log(this.state.file)
      const type = this.state.file.type.split('/')[1];
      if(type.toLowerCase() !== 'png') {
        valid = false;
        this.setState({
          warningImage: true
        })
      } else if(this.state.file.size/1000000 > 4){
        valid = false;
        this.setState({
          warningImage: true
        })
      } else if(this.state.warningImage){
        this.setState({
          warningImage: false
        })
      }
    }
    if(valid) {
        const product = this.state.product;
        product.userId = this.props.auth.id;
        product.price = product.price*100;
        this.props.addProduct( product, this.state.file, this.props.history )
    }
  }
  render() {
    const { handleChange, submitChange } = this
    const { name, description, price, imageUrl } = this.state.product
    const { warning, warningImage, warningName, warningDescription, warningCategory, warningFeatured } = this.state
    const { categories } = this.props
    return (
      <div id="editForm">
        <h1>Add Product</h1>
        <FormGroup controlId="formImage" >
          <Label>Image</Label>
          <Input type='file' onChange={this.handleFileUpload} />
        </FormGroup>
        <Alert color="danger" isOpen={warningImage} fade={false}>
          Error! Please add a PNG image smaller than 4MBs.
        </Alert>
        <Form onSubmit={submitChange}>
          <FormGroup controlId="formName" >
            <Label>Name</Label>
            <Input autoFocus type="text" name="name" value={name} onChange={handleChange} />
          </FormGroup>
          <Alert color="danger" isOpen={warningName} fade={false}>
            Error! Please add a name of at least 3 characters.
          </Alert>
          <FormGroup controlId="formDescription">
            <Label>Description</Label>
            <Input type="textarea" name="description" value={description} onChange={handleChange} />
          </FormGroup>
          <Alert color="danger" isOpen={warningDescription} fade={false}>
            Error! Please add a description of at least 3 characters.
          </Alert>
          <FormGroup controlId="formPrice" >
            <Label>Price ($)</Label>
            <Input type="text" name="price" value={price} onChange={handleChange} />
          </FormGroup>
          <Alert color="danger" isOpen={warning} fade={false}>
            Error! Please make sure price is a number.
          </Alert>
          <FormGroup>
            <Label>Category</Label>
            <Input type="select" name="categoryId" onChange={handleChange} >
              <option disabled={true} selected={true}>Choose a category</option>
              {categories.map( category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Input>
          </FormGroup>
          <Alert color="danger" isOpen={warningCategory} fade={false}>
            Error! Please choose a category.
          </Alert>
          <FormGroup>
            <Label>Featured</Label>
            <Input type="select" name="featured" onChange={handleChange} >
              <option disabled={true} selected={true}>Feature Item?</option>
              <option>true</option>
              <option>false</option>
            </Input>
          </FormGroup>
          <Alert color="danger" isOpen={warningFeatured} fade={false}>
            Error! Please decide whether this product should be featured on the homepage.
          </Alert>
          <br></br>
          <br></br>
          <Button block type="submit" >
            ADD PRODUCT
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, categories }) => {
  return ({
      auth,
      categories
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product, file, history) => dispatch(addProduct(product, file, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
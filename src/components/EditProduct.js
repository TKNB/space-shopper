import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProduct, deleteProduct } from '../store/products'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap';
import { getCategories } from '../store/categories';

class EditProduct extends Component {
  constructor({ product }) {
    super()
    this.state = {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price/100,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
        featured: product.featured,
      },
      warning: false,
      warningImage: false,
      warningName: false,
      warningDescription: false,
      file: null
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
    if(this.state.file) {
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
        product.price = product.price*100;
        this.props.updateProduct( product, this.state.file, this.props.history )
    }
  }
  _deleteProduct(e) {
    e.preventDefault()
    this.props.deleteProduct( this.state.product, this.props.history )
  }
  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product || this.props.categories !== prevProps.categories) {
      const product = {...this.props.product};
      product.price = product.price/100
      this.setState({
        product,
      })
    }
  }
  render() {
    const { handleChange, submitChange, _deleteProduct } = this
    const { name, description, price, imageUrl, categoryId, featured } = this.state.product
    const { warning, warningDescription, warningImage, warningName } = this.state
    const { categories } = this.props
    return (
      <div id="editForm">
        <h1>Edit {this.props.product ? this.props.product.name : ''}</h1>
        <img width="50%" src={imageUrl} alt={`${name} image`} />
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
            <Input type="select" name="categoryId" value={categoryId} onChange={handleChange} >
              {categories.map( category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Featured</Label>
            <Input type="select" name="featured" value={featured} onChange={handleChange} >
              <option>true</option>
              <option>false</option>
            </Input>
          </FormGroup>
          <br></br>
          <br></br>
          <Button block type="submit" >
            UPDATE PRODUCT
          </Button>
        </Form>
        <br></br>
        <Button block type="submit"  onClick={_deleteProduct}>
          DELETE PRODUCT
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ products, categories }, ownProps) => {
  const _product = products.filter( product => product.id === ownProps.id)
  if (_product.length < 1) {
    return ({
      product: {
        id: 0,
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        categoryId: '',
        featured: false,
      },
      categories
    })
  }
  return ({
    product: _product.pop(),
    categories
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (product, file, history) => dispatch(updateProduct(product, file, history)),
    deleteProduct: (id, history) => dispatch(deleteProduct(id, history)),
    getCategories: () => dispatch(getCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);

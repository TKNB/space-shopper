import axios from 'axios';

const initialState = {
  products: [
    /*
    id: UUID,
    name: '',
    description: TEXT,
    price: INT,
    imageUrl: '',
    */
  ]
};

// ACTION TYPES
export const PRODUCTS = {
  LOAD: 'PRODUCTS.LOAD',
  DELETE: 'PRODUCTS.DELETE',
  ADD: 'PRODUCTS.ADD',
  UPDATE: 'PRODUCTS.UPDATE',
};

// ACTION CREATORS
const _loadProducts = products => ({
  type: PRODUCTS.LOAD,
  products
});

const _deleteProduct = product => ({
  type: PRODUCTS.DELETE,
  product,
});

const _updateProduct = product => ({
  type: PRODUCTS.UPDATE,
  product,
});


// THUNKS
export const loadProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => res.data)
    .then(products => dispatch(_loadProducts(products)));
};

export const deleteProduct = (product, history) => dispatch => {
  axios.delete(`/api/products/${product.id}`)
    .then(res => res.data)
    .then(() => dispatch(_deleteProduct(product)))
    .then(() => history.push('/products'))
};

export const updateProduct = (product, file) => {
  return async (dispatch)=> {
    const formData = new FormData();
    formData.append('file', file);
    const {data} = await axios.post('/api/images', formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const updatedProduct = product;
    updatedProduct.imageUrl = data.Location;
    const response = await axios.put(`/api/products/${product.id}`, updatedProduct);
    const newProduct = response.data;
    dispatch(_updateProduct(newProduct));
  }
}

export const addProduct = (product, file, history) => {
  return async (dispatch)=> {
    const formData = new FormData();
    formData.append('file', file);
    const {data} = await axios.post('/api/images', formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const updatedProduct = product;
    updatedProduct.imageUrl = data.Location;
    const response = await axios.post(`/api/products/`, product);
    const newProduct = response.data;
    dispatch(_updateProduct(newProduct));
    history.push('/products');
  }
};

const createImage = (data)=> {
  return (dispatch)=> {
    return axios.post('/api/images', { data })
      .then( res => res.data)
      .then( (image) => console.log(image));
      // .then( (image) => dispatch(updateProduct({})));
  }
};

// REDUCERS
const productsReducer = (products = initialState.products, action) => {
  switch (action.type) {
    case PRODUCTS.LOAD:
      return action.products;
    case PRODUCTS.DELETE:
      return products.filter(product => product.id !== action.product.id);
    case PRODUCTS.UPDATE:
      const _products = products.filter(product => product.id !== action.product.id);
      return [..._products, action.product]
    default: return products;
  }
}

export default productsReducer;
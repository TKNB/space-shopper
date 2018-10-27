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
})

const _addProduct = product => ({
  type: PRODUCTS.ADD,
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

// REDUCERS
const productsReducer = (products = initialState.products, action) => {
  switch (action.type) {
    case PRODUCTS.LOAD:
      return action.products;
    case PRODUCTS.DELETE:
      return products.filter(product => product.id !== action.product.id);
    default: return products;
  }
}

export default productsReducer;

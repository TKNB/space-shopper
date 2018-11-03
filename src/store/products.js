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
  ],
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
  products,
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
  axios
    .get('/api/products')
    .then(res => res.data)
    .then(products => dispatch(_loadProducts(products)));
};

export const deleteProduct = (product, history) => dispatch => {
  axios
    .delete(`/api/products/${product.id}`)
    .then(res => res.data)
    .then(() => dispatch(_deleteProduct(product)))
    .then(() => history.push('/products'));
};

export const updateProduct = product => dispatch => {
  axios
    .put(`/api/products/${product.id}`, product)
    .then(res => res.data)
    .then(product => dispatch(_updateProduct(product)));
};

export const addProduct = (product, history) => dispatch => {
  axios
    .post(`/api/products/`, product)
    .then(res => res.data)
    .then(product => dispatch(_updateProduct(product)))
    .then(() => history.push('/products'));
};

export const addReview = review => dispatch => {
  axios.post('/api/reviews/', review).then(() => dispatch(loadProducts));
};

export const deleteReview = review => dispatch => {
  axios.delete(`/api/reviews/${review.id}`).then(() => dispatch(loadProducts));
};

export const updateReview = review => dispatch => {
  axios
    .put(`/api/reviews/${review.id}`, review)
    .then(() => dispatch(loadProducts));
};

// REDUCERS
const productsReducer = (products = initialState.products, action) => {
  switch (action.type) {
    case PRODUCTS.LOAD:
      return action.products;
    case PRODUCTS.DELETE:
      return products.filter(product => product.id !== action.product.id);
    case PRODUCTS.UPDATE:
      const _products = products.filter(
        product => product.id !== action.product.id
      );
      return [..._products, action.product];
    default:
      return products;
  }
};

export default productsReducer;

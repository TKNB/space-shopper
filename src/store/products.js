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
export const REVIEWS = {
  ADD: 'REVIEWS.ADD',
  DELETE: 'REVIEWS.DELETE',
  UPDATE: 'REVIEWS.UPDATE',
};

export const LOAD_CATEGORY = 'LOAD_CATEGORY';

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
export const loadProducts = (index) => dispatch => {
  if (index !== undefined) {
    return axios.get(`/api/products/page/${index}`)
      .then(res => res.data)
      .then(products => dispatch(_loadProducts(products)));
  }
  else {
    return axios.get(`/api/products/`)
      .then(res => res.data)
      .then(products => dispatch(_loadProducts(products)));
  }
};

export const deleteProduct = (product, history) => dispatch => {
  axios
    .delete(`/api/products/${product.id}`)
    .then(res => res.data)
    .then(() => dispatch(_deleteProduct(product)))
    .then(() => history.push('/products'));
};

export const updateProduct = (product, file, history) => {
  return async (dispatch)=> {
    const updatedProduct = product;
    if(file) {
      const formData = new FormData();
      formData.append('file', file);
      const {data} = await axios.post('/api/images', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      updatedProduct.imageUrl = data.Location;
    }
    const response = await axios.put(`/api/products/${product.id}`, updatedProduct);
    const newProduct = response.data;
    dispatch(_updateProduct(newProduct));
    history.push(`/product/${newProduct.id}`)
  }
}

export const addProduct = (product, file, history) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await axios.post('/api/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const updatedProduct = product;
    updatedProduct.imageUrl = data.Location;
    const response = await axios.post(`/api/products/`, product);
    const newProduct = response.data;
    dispatch(_updateProduct(newProduct));
    history.push(`/product/${newProduct.id}`);
  }
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

export const loadCategory = category => dispatch => {
  axios
    .get(`/api/categories/${category.id}`)
    .then(res => res.data)
    .then(category => dispatch(_loadProducts(category.products)));
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

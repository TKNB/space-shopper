import axios from 'axios';

export const PRODUCT_COUNT = {
  SET: 'PRODUCT_COUNT.SET',
};

const _setProductsCount = count => ({ type: PRODUCT_COUNT.SET, count });

const productsCountReducer = (state = 0, action) => {
  switch (action.type) {
    case PRODUCT_COUNT.SET:
      return action.count;
    default: return state;
  };
};

export const loadProductsCount = () => dispatch => {
  axios.get('/api/products/count')
    .then(res => res.data)
    .then(({ count }) => dispatch(_setProductsCount(count)));
};

export default productsCountReducer;

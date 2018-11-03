import axios from 'axios';

// ACTION TYPES
const NEW_CART = 'NEW_CART';
const GET_CART = 'GET_CART';
const CLEAR_CART = 'CLEAR_CART';
const UPDATE_LINE_ITEM = 'UPDATE_LINE_ITEM';

// REDUCERS
const cartReducer = (cart = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return cart
  }
}

// THUNK CREATORS
export const getCart = () => {
  return (dispatch, getState) => {
    const { auth } = getState();
    return axios.get(`/api/orders/${auth.id}/cart`)
      .then(res => res.data)
      .then(cart => dispatch(_getCart(cart)))
  }
}

export const updateLineItem = (lineItemId, data) => {
  return (dispatch) => {
    if (data.qty === 0) {
      axios.delete(`/api/orders/line_item/${lineItemId}`)
        .then(() => dispatch(getCart()))
    }
    else {
      axios.put(`/api/orders/line_item/${lineItemId}`, data)
        .then(() => dispatch(getCart()))
    }
  }
}

export const addToCart = (product, quantity, history) => {
  return async (dispatch, getState) => {
    var { cart, auth } = getState();
    if (!auth.id) {
      history.push('/login')
    }
    if (!cart.id) {
      try {
        const { data } = await axios.post(`/api/orders/${auth.id}`)
        cart = data;
        cart.lineItems = []
        dispatch(_getCart(cart));
      }
      catch (ex) {
        console.log(ex)
      }
    }
    const item = cart.lineItems.find(item => item.product.name === product.name);
    if (item) {
      const qty = item.qty + quantity;
      dispatch(updateLineItem(item.id, { qty }))
    } else {
      try {
        await axios.post(`/api/orders/${cart.id}/line_item`, { productId: product.id })
        dispatch(getCart())
      }
      catch (ex) {
        console.log(ex)
      }
    }
  }
};

// ACTION CREATORS
export const _getCart = (cart) => ({ type: GET_CART, cart });

export default cartReducer;

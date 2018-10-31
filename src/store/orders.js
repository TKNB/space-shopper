import axios from 'axios';

const initialState = {
  orders: []
}

// ACTION TYPES
const SET_ORDERS = 'SET_ORDERS';


// ACTION CREATORS
const setOrders = (orders) => ({ type: SET_ORDERS, orders });


// THUNK CREATORS
export const getOrders = () => {
  return (dispatch) => {
    axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => dispatch(setOrders(orders)))
  }
}

export const placeOrder = (orderId, history) => {
  return (dispatch) => {
    axios.put(`/api/orders/${orderId}`, { complete: true })
      .then(() => dispatch(getOrders()))
      .then(() => history.push(`/confirmation/${orderId}`))
  }
}

export const updateLineItem = (lineItemId, data) => {
  return (dispatch) => {
    axios.put(`/api/orders/line_item/${lineItemId}`, data)
      .then(() => dispatch(getOrders()))
  }
}

export const addToCart = (cart, product) => {
  const lineItems = cart.lineItems.reduce((map, lineItem) => {
    map[lineItem.productId] = lineItem;
    return map;
  }, {})
  const lineItem = lineItems[product.id]

  return dispatch => {
    if (lineItem) {
      return dispatch(updateLineItem(lineItem.id,
        { qty: ++lineItem.qty }))
    }
    return axios.post(`/api/orders/${cart.id}/line_item/`,
      { qty: 1, productId: product.id, orderId: cart.id })
      .then(() => dispatch(getOrders()));
  }
};

// REDUCERS
const ordersReducer = (orders = initialState.orders, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    default:
      return orders
  }
}

export default ordersReducer;

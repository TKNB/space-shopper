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

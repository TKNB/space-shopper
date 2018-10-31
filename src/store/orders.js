import axios from 'axios';

const initialState = {
  orders: []
}

// ACTION TYPES
const SET_ORDERS = 'SET_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';

// ACTION CREATORS
const setOrders = (orders) => ({ type: SET_ORDERS, orders });
const _createOrder = order => ({ type: CREATE_ORDER, order });

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

export const createOrder = (order, history) => (dispatch, getState) => {
  //bringing this in for when we update the routes
  const { auth } = getState();
  const userId = auth.id;

  axios.post('api/orders', order)
    .then(res => res.data)
    .then(order => dispatch(_createOrder(order)))
    .then(() => history.push('/orders'));
}

export const addToCart = (cart, product) => {
  if (!product) { return null }
  return (dispatch, getState) => {
    const { auth } = getState();
    const userId = auth.id;
    let newCart = false;
    let lineItem = '';

    if (!cart) {
      cart = { complete: false, userId, lineItems: [] }
      newCart = true;
      dispatch(createOrder(cart))
    }

    if (!newCart) {
      const lineItems = cart.lineItems.reduce((map, lineItem) => {
        map[lineItem.productId] = lineItem;
        return map;
      }, {}) || '';
      lineItem = lineItems[product.id] || '';
    }

    if (lineItem) {
      return dispatch(updateLineItem(lineItem.id,
        { qty: ++lineItem.qty }))
    } else {
      return axios.post(`/api/orders/${cart.id}/line_item/`,
        { qty: 1, productId: product.id, orderId: cart.id })
        .then(() => dispatch(getOrders()));
    }
  }
};

// REDUCERS
const ordersReducer = (orders = initialState.orders, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    case CREATE_ORDER:
      return [...orders, action.order];
    default:
      return orders
  }
}

export default ordersReducer;

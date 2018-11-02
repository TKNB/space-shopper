import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import usersReducer from './users';
import productsReducer from './products';
import ordersReducer from './orders';
import cartReducer from './cart';
import authReducer from './auth';

const reducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  orders: ordersReducer,
  cart: cartReducer,
  auth: authReducer,
});

export default createStore(reducer, applyMiddleware(logger, thunk));

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import usersReducer from './users';
import productsReducer from './products';
import productsCountReducer from './productsCount';
import ordersReducer from './orders';
import cartReducer from './cart';
import authReducer from './auth';
import categoriesReducer from './categories';

const reducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  productsCount: productsCountReducer,
  orders: ordersReducer,
  cart: cartReducer,
  auth: authReducer,
  categories: categoriesReducer,
});

export default createStore(reducer, applyMiddleware(logger, thunk));

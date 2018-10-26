import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import usersReducer from './users';
import productsReducer from './products';
import ordersReducer from './orders';

const reducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  orders: ordersReducer
})

export default createStore(reducer, applyMiddleware(logger, thunk));

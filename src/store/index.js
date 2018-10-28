import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import tempAuthReducer from './tempAuth';
import usersReducer from './users';
import productsReducer from './products';
import ordersReducer from './orders';
import authReducer from './auth';

const reducer = combineReducers({
  auth: tempAuthReducer,
  users: usersReducer,
  products: productsReducer,
  orders: ordersReducer,
  auth: authReducer,
});

export default createStore(reducer, applyMiddleware(logger, thunk));

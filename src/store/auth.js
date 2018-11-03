import axios from 'axios';
import { getCart } from './cart'

const SET_AUTH = 'SET_AUTH';

const _setAuth = auth => ({
  type: SET_AUTH,
  auth,
});

const exchangeTokenForAuth = () => {
  return dispatch => {
    const token = window.localStorage.getItem('token');
    if (!token) return;
    return axios
      .get('/api/users/auth', {
        headers: {
          authorization: token,
        },
      })
      .then(res => res.data)
      .then(auth => dispatch(_setAuth(auth)))
      .then(auth => dispatch(getCart()))
      .catch(ex => window.localStorage.removeItem('token'));
  };
};

const logout = () => {
  window.localStorage.removeItem('token');
  return _setAuth({});
};
const login = credentials => {
  return dispatch => {
    return axios
      .post('/api/users/auth', credentials)
      .then(res => res.data)
      .then(data => {
        window.localStorage.setItem('token', data.token);
        dispatch(exchangeTokenForAuth());
      });
  };
};
const authReducer = (state = {}, action) => {
  if (action.type === SET_AUTH) {
    state = action.auth;
  }
  return state;
};

export default authReducer;
export { login, exchangeTokenForAuth, logout };

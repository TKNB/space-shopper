import axios from 'axios';

//const initialState = {
// users: [],
//};

// ACTION TYPES
const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';
const EDIT_USER = 'EDIT_USER';

// ACTION CREATORS
const _getUser = user => ({
  type: GET_USER,
  user,
});

const _setUser = user => ({
  type: SET_USER,
  user,
});

const _editUser = user => ({
  type: SET_USER,
  user,
});

// THUNK CREATORS
const getUser = user => {
  return dispatch => {
    return axios
      .get(`/api/users/${user.id}`)
      .then(res => res.data)
      .then(user => {
        dispatch(_getUser(user));
      });
  };
};
const setUser = user => {
  return dispatch => {
    return axios
      .post(`/api/users`, user)
      .then(res => res.data)
      .then(user => {
        dispatch(_setUser(user));
      });
  };
};
const editUser = user => {
  return dispatch => {
    return axios
      .put(`/api/users/${user.id}`, user)
      .then(res => res.data)
      .then(user => {
        dispatch(_editUser(user));
      });
  };
};
// REDUCERS
const usersReducer = (user = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case SET_USER:
      return action.user;
    case EDIT_USER:
      return action.user;
    default:
      break;
  }
  return user;
};

export default usersReducer;

export { getUser, setUser, editUser };

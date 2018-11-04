import axios from 'axios';

//const initialState = {
// users: [],
//};

// ACTION TYPES
const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';
const EDIT_USER = 'EDIT_USER';
const DELETE_USER = 'DELETE_USER';
// ACTION CREATORS
const _getUsers = users => ({
  type: GET_USERS,
  users,
});

const _createUser = user => ({
  type: CREATE_USER,
  user,
});

const _editUser = user => ({
  type: EDIT_USER,
  user,
});

const _deleteUser = user => ({
  type: DELETE_USER,
  user,
});

// THUNK CREATORS
const getUsers = users => {
  return dispatch => {
    return axios
      .get(`/api/users/`)
      .then(res => res.data)
      .then(users => {
        dispatch(_getUsers(users));
      });
  };
};

const createUser = user => {
  return dispatch => {
    return axios
      .post(`/api/users`, user)
      .then(res => res.data)
      .then(user => {
        dispatch(_createUser(user));
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
const deleteUser = user => {
  return dispatch => {
    return axios.delete(`/api/users/${user.id}`).then(() => {
      dispatch(_deleteUser(user));
    });
  };
};
// REDUCERS
const usersReducer = (users = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case CREATE_USER:
      return [...users, action.user];
    case EDIT_USER:
      return [...users].map(user => {
        if (user.id === action.user.id) return action.user;
      });
    case DELETE_USER:
      return [...users].filter(user => user.id !== action.user.id);
    default:
      break;
  }
  return users;
};

export default usersReducer;

export { createUser, deleteUser, editUser, getUsers };

import axios from 'axios';

//ACTION TYPES
const GET_CATEGORIES = 'GET_CATEGORIES';

// ACTION CREATORS
const _getCategories = categories => ({
  type: GET_CATEGORIES,
  categories,
});

//THUNKS

const getCategories = () => {
  return dispatch => {
    return axios
      .get(`/api/categories`)
      .then(res => res.data)
      .then(categories => {
        dispatch(_getCategories(categories));
      });
  };
};

// REDUCERS
const categoriesReducer = (categories = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      break;
  }
  return categories;
};

export default categoriesReducer;

export { getCategories };

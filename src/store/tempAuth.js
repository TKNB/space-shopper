import axios from 'axios';

const initialState = {
  auth: {
    id: '7215b66a-11ce-4800-beb5-3ecc79c1d788',
    username: 'CarlSagan@cosmos.net',
    firstName: 'Carl',
    lastName: 'Sagan',
  }
}

// ACTION TYPES


// ACTION CREATORS


// THUNK CREATORS


// REDUCERS
const tempAuthReducer = (auth = initialState.auth, action) => {
      return auth
}

export default tempAuthReducer;

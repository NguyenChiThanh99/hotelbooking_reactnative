import {UPDATE_USER} from '../actions/type';

const initialState = null;

var userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      state = action.newUser;
      return state;
    default:
      return state;
  }
};
export default userReducer;

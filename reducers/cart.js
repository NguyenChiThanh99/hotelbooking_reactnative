import {UPDATE} from '../actions/type';

const initialState = [];

var cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      state = action.newCart;
      return state;
    default:
      return state;
  }
};
export default cartReducer;

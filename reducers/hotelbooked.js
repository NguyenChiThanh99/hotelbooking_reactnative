import {UPDATE_HOTELBOOKED} from '../actions/type';

const initialState = false;

var hotelbookedReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_HOTELBOOKED:
      state = action.newHotel;
      return state;
    default:
      return state;
  }
};
export default hotelbookedReducer;

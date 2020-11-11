import {UPDATE_RATING} from '../actions/type';

const initialState = [];

var ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RATING:
      state = action.newRating;
      return state;
    default:
      return state;
  }
};
export default ratingReducer;

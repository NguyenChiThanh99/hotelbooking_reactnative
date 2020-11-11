import {combineReducers} from 'redux';
import cartReducer from './cart';
import userReducer from './user';
import hotelbookedReducer from './hotelbooked';
import ratingReducer from './rating';

const myReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  hotel: hotelbookedReducer,
  rating: ratingReducer,
});
export default myReducer;

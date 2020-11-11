import {combineReducers} from 'redux';
import cartReducer from './cart';
import userReducer from './user';
import hotelbookedReducer from './hotelbooked';

const myReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  hotel: hotelbookedReducer,
});
export default myReducer;

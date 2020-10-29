import {combineReducers} from 'redux';
import cartReducer from './cart';

const myReducer = combineReducers({
  cart: cartReducer,
});
export default myReducer;

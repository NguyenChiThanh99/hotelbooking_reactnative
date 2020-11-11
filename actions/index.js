import {UPDATE, UPDATE_USER, UPDATE_HOTELBOOKED} from './type';

export const updateCart = (newCart) => {
  return {
    type: UPDATE,
    newCart: newCart,
  };
};

export const updateUser = (newUser) => {
  return {
    type: UPDATE_USER,
    newUser: newUser,
  };
};

export const updateHotel = (newHotel) => {
  return {
    type: UPDATE_HOTELBOOKED,
    newHotel: newHotel,
  };
};

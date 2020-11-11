import {UPDATE, UPDATE_USER, UPDATE_HOTELBOOKED, UPDATE_RATING} from './type';

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

export const updateRating = (newRating) => {
  return {
    type: UPDATE_RATING,
    newRating: newRating,
  };
};

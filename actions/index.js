import {UPDATE} from './type';

export const updateCart = (newCart) => {
  return {type: UPDATE, newCart: newCart};
};

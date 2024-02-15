import React from 'react';

import { reducer } from './reducer';

export function useProducts() {
  return React.useReducer(reducer, []);
}

export {
  add,
  decreaseQuantity,
  increaseQuantity,
  remove,
  reorder,
  setProducts,
} from './actions';

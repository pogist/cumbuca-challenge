import { Product } from '@types';
import React from 'react';

import { reducer } from './reducer';

export function useProducts(initial: Product[]) {
  return React.useReducer(reducer, initial);
}

export {
  add,
  decreaseQuantity,
  increaseQuantity,
  remove,
  reorder,
} from './actions';

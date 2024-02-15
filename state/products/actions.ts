import { Product } from '@types';

export type Action = {
  type: string;
  payload: any;
};

export const ADD = 'ADD';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const REMOVE = 'REMOVE';
export const REORDER = 'REORDER';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export function add(
  name: string,
  priceText: string,
  quantityText: string,
): Action {
  return {
    type: ADD,
    payload: { name, priceText, quantityText },
  };
}

export function remove(id: Product['id']): Action {
  return {
    type: REMOVE,
    payload: { id },
  };
}

export function reorder(fromIndex: number, toIndex: number): Action {
  return {
    type: REORDER,
    payload: { fromIndex, toIndex },
  };
}

export function increaseQuantity(id: Product['id']): Action {
  return {
    type: INCREASE_QUANTITY,
    payload: { id },
  };
}

export function decreaseQuantity(id: Product['id']): Action {
  return {
    type: DECREASE_QUANTITY,
    payload: { id },
  };
}

export function setProducts(products: Product[]): Action {
  return {
    type: SET_PRODUCTS,
    payload: { products },
  };
}

import { expect as jestExpect } from '@jest/globals';
import { Product } from '@types';

import {
  add,
  decreaseQuantity,
  increaseQuantity,
  remove,
  reorder,
  setProducts,
} from '../actions';
import { reducer } from '../reducer';

describe('reducer', () => {
  describe('setProducts', () => {
    it('should completely override current state', () => {
      const state: Product[] = [
        {
          id: 1,
          name: 'ProductA',
          price: 1,
          quantity: 1,
          totalPrice: 1,
        },
        {
          id: 2,
          name: 'ProductB',
          price: 1,
          quantity: 1,
          totalPrice: 1,
        },
      ];

      const newProducts = [
        {
          id: 3,
          name: 'ProductC',
          price: 1,
          quantity: 1,
          totalPrice: 1,
        },
        {
          id: 4,
          name: 'ProductD',
          price: 1,
          quantity: 1,
          totalPrice: 1,
        },
      ];

      const newState = reducer(state, setProducts(newProducts));

      jestExpect(newState).toStrictEqual(newProducts);
    });
  });

  describe('add', () => {
    it('should increment id', () => {
      const state: Product[] = [
        {
          id: 1,
          name: 'ProductA',
          price: 1,
          quantity: 1,
          totalPrice: 1,
        },
        {
          id: 2,
          name: 'ProductB',
          price: 1,
          quantity: 1,
          totalPrice: 1,
        },
      ];

      const newState = reducer(state, add('ProductC', '1', '1'));

      jestExpect(newState).toStrictEqual([
        ...state,
        {
          id: 3,
          name: 'ProductC',
          price: 1,
          quantity: 1,
          totalPrice: 1,
        },
      ]);
    });

    it('should use smallest id available', () => {
      const state: Product[] = [
        {
          id: 1,
          name: 'ProductA',
          price: 1,
          quantity: 1,
          totalPrice: 1,
        },
        {
          id: 2,
          name: 'ProductB',
          price: 1,
          quantity: 1,
          totalPrice: 1,
        },
        {
          id: 5,
          name: 'ProductC',
          price: 1,
          quantity: 1,
          totalPrice: 1,
        },
      ];

      const newState = reducer(state, add('ProductD', '1', '1'));

      jestExpect(newState).toStrictEqual([
        ...state,
        {
          id: 3,
          name: 'ProductD',
          price: 1,
          quantity: 1,
          totalPrice: 1,
        },
      ]);
    });

    it('should infer total price from quantity and price', () => {
      const state: Product[] = [];

      const newState = reducer(state, add('ProductA', '50', '3'));

      jestExpect(newState).toStrictEqual([
        {
          id: 1,
          name: 'ProductA',
          price: 50,
          quantity: 3,
          totalPrice: 150,
        },
      ]);
    });
  });

  describe('remove', () => {
    it('should remove item with given id', () => {
      const state = [
        {
          id: 3,
          name: 'ProductA',
          price: 50,
          quantity: 3,
          totalPrice: 150,
        },
        {
          id: 4,
          name: 'ProductB',
          price: 50,
          quantity: 3,
          totalPrice: 150,
        },
        {
          id: 5,
          name: 'ProductC',
          price: 10,
          quantity: 3,
          totalPrice: 30,
        },
      ];

      const newState = reducer(state, remove(4));

      jestExpect(newState).toStrictEqual([
        {
          id: 3,
          name: 'ProductA',
          price: 50,
          quantity: 3,
          totalPrice: 150,
        },
        {
          id: 5,
          name: 'ProductC',
          price: 10,
          quantity: 3,
          totalPrice: 30,
        },
      ]);
    });
  });

  describe('reorder', () => {
    it('should swap products based on their indices', () => {
      const state: Product[] = [
        {
          id: 3,
          name: 'ProductA',
          price: 50,
          quantity: 3,
          totalPrice: 150,
        },
        {
          id: 4,
          name: 'ProductB',
          price: 5,
          quantity: 2,
          totalPrice: 10,
        },
        {
          id: 5,
          name: 'ProductC',
          price: 10,
          quantity: 3,
          totalPrice: 30,
        },
      ];

      const newState = reducer(state, reorder(2, 0));

      jestExpect(newState).toStrictEqual([
        {
          id: 5,
          name: 'ProductC',
          price: 10,
          quantity: 3,
          totalPrice: 30,
        },
        {
          id: 4,
          name: 'ProductB',
          price: 5,
          quantity: 2,
          totalPrice: 10,
        },
        {
          id: 3,
          name: 'ProductA',
          price: 50,
          quantity: 3,
          totalPrice: 150,
        },
      ]);
    });
  });

  describe('increaseQuantity', () => {
    it('should increase quantity of the item with the given id', () => {
      const state: Product[] = [
        {
          id: 5,
          name: 'ProductC',
          price: 10,
          quantity: 3,
          totalPrice: 30,
        },
        {
          id: 4,
          name: 'ProductB',
          price: 5,
          quantity: 2,
          totalPrice: 10,
        },
        {
          id: 3,
          name: 'ProductA',
          price: 50,
          quantity: 3,
          totalPrice: 150,
        },
        {
          id: 2,
          name: 'ProductD',
          price: 3,
          quantity: 1,
          totalPrice: 1,
        },
      ];

      const newState = reducer(state, increaseQuantity(2));

      jestExpect(newState).toStrictEqual([
        {
          id: 5,
          name: 'ProductC',
          price: 10,
          quantity: 3,
          totalPrice: 30,
        },
        {
          id: 4,
          name: 'ProductB',
          price: 5,
          quantity: 2,
          totalPrice: 10,
        },
        {
          id: 3,
          name: 'ProductA',
          price: 50,
          quantity: 3,
          totalPrice: 150,
        },
        {
          id: 2,
          name: 'ProductD',
          price: 3,
          quantity: 2,
          totalPrice: 6,
        },
      ]);
    });

    it('should update total price based on the new quantity', () => {
      const state: Product[] = [
        {
          id: 1,
          name: 'ProductA',
          price: 5,
          quantity: 2,
          totalPrice: 10,
        },
      ];

      const newState = reducer(state, increaseQuantity(1));

      jestExpect(newState).toStrictEqual([
        {
          id: 1,
          name: 'ProductA',
          price: 5,
          quantity: 3,
          totalPrice: 15,
        },
      ]);
    });
  });

  describe('descreaseQuantity', () => {
    it('should decrease quantity of the item with the given id', () => {
      const state: Product[] = [
        {
          id: 5,
          name: 'ProductC',
          price: 10,
          quantity: 3,
          totalPrice: 30,
        },
        {
          id: 4,
          name: 'ProductB',
          price: 5,
          quantity: 2,
          totalPrice: 10,
        },
        {
          id: 3,
          name: 'ProductA',
          price: 50,
          quantity: 3,
          totalPrice: 150,
        },
        {
          id: 2,
          name: 'ProductD',
          price: 3,
          quantity: 1,
          totalPrice: 1,
        },
      ];

      const newState = reducer(state, decreaseQuantity(3));

      jestExpect(newState).toStrictEqual([
        {
          id: 5,
          name: 'ProductC',
          price: 10,
          quantity: 3,
          totalPrice: 30,
        },
        {
          id: 4,
          name: 'ProductB',
          price: 5,
          quantity: 2,
          totalPrice: 10,
        },
        {
          id: 3,
          name: 'ProductA',
          price: 50,
          quantity: 2,
          totalPrice: 100,
        },
        {
          id: 2,
          name: 'ProductD',
          price: 3,
          quantity: 1,
          totalPrice: 1,
        },
      ]);
    });

    it('should update total price based on the new quantity', () => {
      const state: Product[] = [
        {
          id: 5,
          name: 'ProductC',
          price: 10,
          quantity: 3,
          totalPrice: 30,
        },
        {
          id: 4,
          name: 'ProductB',
          price: 5,
          quantity: 2,
          totalPrice: 10,
        },
      ];

      const newState = reducer(state, decreaseQuantity(5));

      jestExpect(newState).toStrictEqual([
        {
          id: 5,
          name: 'ProductC',
          price: 10,
          quantity: 2,
          totalPrice: 20,
        },
        {
          id: 4,
          name: 'ProductB',
          price: 5,
          quantity: 2,
          totalPrice: 10,
        },
      ]);
    });

    it('should remove item if quantity reaches 0', () => {
      const state: Product[] = [
        {
          id: 3,
          name: 'ProductA',
          price: 50,
          quantity: 2,
          totalPrice: 100,
        },
        {
          id: 2,
          name: 'ProductB',
          price: 3,
          quantity: 1,
          totalPrice: 1,
        },
      ];

      const newState = reducer(state, decreaseQuantity(2));

      jestExpect(newState).toStrictEqual([
        {
          id: 3,
          name: 'ProductA',
          price: 50,
          quantity: 2,
          totalPrice: 100,
        },
      ]);
    });
  });
});

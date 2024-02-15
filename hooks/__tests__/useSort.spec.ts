import { expect as jestExpect } from '@jest/globals';
import { Product } from '@types';

import { useSort } from '../useSort';

describe('useSort', () => {
  describe('when sorting number prop', () => {
    it('should sort in asceding order', () => {
      const items: Product[] = [
        {
          id: 3,
          name: 'ProductA',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 1,
          name: 'ProductC',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 2,
          name: 'ProductB',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
      ];

      const sorted = useSort(items, 'asc', 'id');

      jestExpect(sorted).toStrictEqual([
        {
          id: 1,
          name: 'ProductC',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 2,
          name: 'ProductB',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 3,
          name: 'ProductA',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
      ]);
    });

    it('should sort in descending order', () => {
      const items: Product[] = [
        {
          id: 3,
          name: 'ProductA',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 1,
          name: 'ProductC',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 2,
          name: 'ProductB',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
      ];

      const sorted = useSort(items, 'desc', 'id');

      jestExpect(sorted).toStrictEqual([
        {
          id: 3,
          name: 'ProductA',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 2,
          name: 'ProductB',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 1,
          name: 'ProductC',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
      ]);
    });
  });

  describe('when sorting string prop', () => {
    it('should sort in asceding order', () => {
      const items: Product[] = [
        {
          id: 3,
          name: 'ProductA',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 1,
          name: 'ProductC',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 2,
          name: 'ProductB',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
      ];

      const sorted = useSort(items, 'asc', 'name');

      jestExpect(sorted).toStrictEqual([
        {
          id: 3,
          name: 'ProductA',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 2,
          name: 'ProductB',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 1,
          name: 'ProductC',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
      ]);
    });

    it('should sort in descending order', () => {
      const items: Product[] = [
        {
          id: 3,
          name: 'ProductA',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 1,
          name: 'ProductC',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 2,
          name: 'ProductB',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
      ];

      const sorted = useSort(items, 'desc', 'name');

      jestExpect(sorted).toStrictEqual([
        {
          id: 1,
          name: 'ProductC',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 2,
          name: 'ProductB',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
        {
          id: 3,
          name: 'ProductA',
          price: 30,
          quantity: 2,
          totalPrice: 60,
        },
      ]);
    });
  });
});

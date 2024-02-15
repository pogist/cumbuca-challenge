import { expect as jestExpect } from '@jest/globals';
import { Product } from '@types';

import { useFilter } from '../useFilter';

describe('useFilter', () => {
  it('should filter items of a list based on a prop and a search term', () => {
    const items: Product[] = [
      {
        id: 1,
        name: 'Cadeira',
        price: 10,
        quantity: 1,
        totalPrice: 10,
      },
      {
        id: 2,
        name: 'Caderno',
        price: 15,
        quantity: 2,
        totalPrice: 30,
      },
      {
        id: 3,
        name: 'Livro',
        price: 4,
        quantity: 2,
        totalPrice: 8,
      },
      {
        id: 4,
        name: 'Cadeado',
        price: 20,
        quantity: 2,
        totalPrice: 40,
      },
      {
        id: 5,
        name: 'Chave',
        price: 5,
        quantity: 2,
        totalPrice: 10,
      },
    ];

    const filtered = useFilter(items, 'name', 'Cad');

    jestExpect(filtered).toStrictEqual([
      {
        id: 1,
        name: 'Cadeira',
        price: 10,
        quantity: 1,
        totalPrice: 10,
      },
      {
        id: 2,
        name: 'Caderno',
        price: 15,
        quantity: 2,
        totalPrice: 30,
      },
      {
        id: 4,
        name: 'Cadeado',
        price: 20,
        quantity: 2,
        totalPrice: 40,
      },
    ]);
  });
});

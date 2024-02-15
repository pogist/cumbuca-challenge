import { Product } from '@types';

import {
  ADD,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE,
  REORDER,
  SET_PRODUCTS,
  type Action,
} from './actions';

export function reducer(state: Product[], action: Action): Product[] {
  if (action.type === SET_PRODUCTS) {
    const { products } = action.payload as { products: Product[] };
    return products;
  }
  if (action.type === ADD) {
    const { name, priceText, quantityText } = action.payload as {
      name: string;
      priceText: string;
      quantityText: string;
    };
    const id = getNextId(state);
    const price = +priceText;
    const quantity = +quantityText;
    const totalPrice = price * quantity;
    return [...state, { id, name, price, quantity, totalPrice }];
  }
  if (action.type === REMOVE) {
    const { id } = action.payload as { id: Product['id'] };
    return state.filter((product) => product.id !== id);
  }
  if (action.type === REORDER) {
    const { fromIndex, toIndex } = action.payload as {
      fromIndex: number;
      toIndex: number;
    };
    const fromProduct = state.find((_, index) => index === fromIndex);
    const toProduct = state.find((_, index) => index === toIndex);
    if (fromProduct && toProduct) {
      const fromId = fromProduct.id;
      const toId = toProduct.id;
      return state.map((product) => {
        if (product.id === fromId) {
          return toProduct;
        }
        if (product.id === toId) {
          return fromProduct;
        }
        return product;
      });
    }
  }
  if (action.type === INCREASE_QUANTITY) {
    const { id } = action.payload as { id: Product['id'] };
    return state.map((product) => {
      if (product.id === id) {
        const quantity = product.quantity + 1;
        const totalPrice = product.price * quantity;
        return { ...product, quantity, totalPrice };
      }
      return product;
    });
  }
  if (action.type === DECREASE_QUANTITY) {
    const { id } = action.payload as { id: Product['id'] };
    return state.reduce((newState: Product[], product: Product) => {
      if (product.id === id) {
        if (product.quantity === 1) {
          return newState;
        }
        const quantity = product.quantity - 1;
        const totalPrice = product.price * quantity;
        return [...newState, { ...product, quantity, totalPrice }];
      }
      return [...newState, product];
    }, []);
  }
  return state;
}

function getNextId(products: Product[]): number {
  let id = 1;
  while (!isAvailable(id, products)) {
    id++;
  }
  return id;
}

function isAvailable(id: number, products: Product[]): boolean {
  return products.every((product) => product.id !== id);
}

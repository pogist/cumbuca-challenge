import { Product } from '@types';

type ProductFields = {
  [K in keyof Product]: string;
};

const fields: ProductFields = {
  id: 'ID',
  name: 'Produto',
  price: 'Valor',
  quantity: 'Quantidade',
  totalPrice: 'Total',
};

export function useProductFields(): ProductFields {
  return fields;
}

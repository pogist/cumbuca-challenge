import { Product } from '@types';

type ProductFields = {
  [K in keyof Product]: string;
};

const fields: ProductFields = {
  id: 'Id',
  name: 'Nome',
  price: 'Valor',
  quantity: 'Quant.',
  totalPrice: 'Total',
};

export function useProductFields(): ProductFields {
  return fields;
}

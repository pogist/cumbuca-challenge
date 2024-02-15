import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '@types';
import { isNullable } from '@util';

const PRODUCTS = '@products';

async function set(products: Product[]) {
  await AsyncStorage.setItem(PRODUCTS, JSON.stringify(products));
}

async function get(): Promise<Product[]> {
  const products = await AsyncStorage.getItem(PRODUCTS);
  if (isNullable(products)) {
    return [];
  }
  return JSON.parse(products) as Product[];
}

export default { get, set };

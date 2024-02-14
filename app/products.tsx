import Button from '@components/Button';
import Icon from '@components/Icon';
import Input from '@components/Input';
import { ProductList } from '@components/ProductList';
import { useFilter, useHeaderHeight, useSort, useValidation } from '@hooks';
import {
  add,
  decreaseQuantity,
  increaseQuantity,
  remove,
  reorder,
  useProducts,
} from '@state/products';
import { createStyles, useStyles, useTheme } from '@theming';
import { Product } from '@types';
import { isEmpty } from '@util';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Produto 1',
    price: 100,
    quantity: 2,
    totalPrice: 100 * 2,
  },
];

export default function Products() {
  const theme = useTheme();
  const styles = useStyles(themedStyles);
  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const [name, price, quantity, disabled] = useProductForm();

  const [searchTerm, setSearchTerm] = useState<string>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<keyof Product | undefined>(
    undefined,
  );

  const [products, dispatch] = useProducts(sampleProducts);

  const filtered = useFilter(products, 'name', searchTerm);
  const sorted = useSort(filtered, sortOrder, sortField);

  async function onAdd() {
    if (name.value && price.value && quantity.value) {
      dispatch(add(name.value, price.value, quantity.value));
    }
  }

  async function onReorder(fromIndex: number, toIndex: number) {
    if (isEmpty(searchTerm) && isEmpty(sortField)) {
      dispatch(reorder(fromIndex, toIndex));
    }
  }

  const onRemove = useCallback(
    (id: Product['id']) => dispatch(remove(id)),
    [dispatch],
  );

  const onIncreaseQuantity = useCallback(
    (id: Product['id']) => dispatch(increaseQuantity(id)),
    [dispatch],
  );

  const onDecreaseQuantity = useCallback(
    (id: Product['id']) => dispatch(decreaseQuantity(id)),
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Icon
              name="three-bars"
              size={20}
              color={theme.secondary}
              onPress={() => router.push('/settings')}
            />
          ),
          headerSearchBarOptions: {
            placeholder: 'Buscar produto',
            onChangeText: (event) => setSearchTerm(event.nativeEvent.text),
          },
        }}
      />
      <View style={[styles.addForm, { marginTop: headerHeight }]}>
        <Input
          containerStyle={styles.inputStyle}
          value={name.value}
          error={name.error}
          onChangeText={name.onChange}
          placeholder="Nome do produto"
        />
        <Input
          containerStyle={styles.inputStyle}
          value={price.value}
          error={price.error}
          onChangeText={price.onChange}
          placeholder="Valor do produto"
          keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
        />
        <Input
          containerStyle={styles.inputStyle}
          value={quantity.value}
          error={quantity.error}
          onChangeText={quantity.onChange}
          placeholder="Quantidade de produtos"
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
        />
        <Button
          label="Adicionar"
          labelStyle={styles.addButtonText}
          containerStyle={styles.addButton}
          onPress={onAdd}
          disabled={disabled}
        />
      </View>
      <ProductList
        products={sorted}
        sortOrder={sortOrder}
        sortField={sortField}
        setSortOrder={setSortOrder}
        setSortField={setSortField}
        onRemove={onRemove}
        onReorder={onReorder}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecreaseQuantity={onDecreaseQuantity}
      />
    </View>
  );
}

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.background,
      paddingHorizontal: 6,
    },
    inputStyle: {
      height: 40,
      marginVertical: 8,
      marginHorizontal: 6,
    },
    addForm: {
      gap: 12,
      alignSelf: 'stretch',
    },
    addButton: {
      marginVertical: 16,
    },
    addButtonText: {
      color: theme.primary,
      fontSize: 18,
      fontWeight: '600',
    },
  }),
);

type FormField = {
  error: string;
  value?: string;
  onChange: (text: string) => void;
};

type UseProductForm = [FormField, FormField, FormField, boolean];

function useProductForm(): UseProductForm {
  const isRequired = useRef({
    validate: (value: string) => value.length > 0,
  }).current;

  const isNumber = useRef({
    errorMessage: 'Campo deve ser um número válido',
    validate: (value: string) => !isNaN(+value),
  }).current;

  const isIntegral = useRef({
    errorMessage: 'Campo deve ser um número inteiro',
    validate: (value: string) => !/[,|\\.]/g.test(value),
  }).current;

  const isNotZero = useRef({
    errorMessage: 'Campo não pode ser 0',
    validate: (value: string) => +value > 0,
  }).current;

  const [name, setName] = useState<string>();
  const [isNameValid, nameError] = useValidation(name, [isRequired]);

  const nameField: FormField = {
    value: name,
    error: nameError,
    onChange: setName,
  };

  const [price, setPrice] = useState<string>();
  const [isPriceValid, priceError] = useValidation(price, [
    isRequired,
    isNumber,
  ]);

  const onPriceChange = React.useCallback(
    (value: string) =>
      setPrice(!/,/g.test(value) ? value : value.replaceAll(/,/g, '.')),
    [],
  );

  const priceField: FormField = {
    value: price,
    error: priceError,
    onChange: onPriceChange,
  };

  const [quantity, setQuantity] = useState<string>();
  const [isQuantityValid, quantityError] = useValidation(quantity, [
    isRequired,
    isNumber,
    isIntegral,
    isNotZero,
  ]);

  const quantityField: FormField = {
    value: quantity,
    error: quantityError,
    onChange: setQuantity,
  };

  const disabled = !isNameValid || !isPriceValid || !isQuantityValid;
  return [nameField, priceField, quantityField, disabled];
}

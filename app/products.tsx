import Button from '@components/Button';
import Icon from '@components/Icon';
import Input from '@components/Input';
import { ProductList } from '@components/ProductList';
import { useHeaderHeight } from '@hooks';
import { useValidation } from '@hooks/form';
import { createStyles, useStyles, useTheme } from '@theming';
import { Product } from '@types';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const sampleProducts: Product[] = [
  {
    id: 0,
    name: 'Produto 1',
    price: 100,
    quantity: 2,
    totalPrice: 100 * 2,
  },
  {
    id: 1,
    name: 'Produto 2',
    price: 500,
    quantity: 5,
    totalPrice: 500 * 5,
  },
  {
    id: 2,
    name: 'Produto 3',
    price: 10,
    quantity: 15,
    totalPrice: 10 * 15,
  },
  {
    id: 3,
    name: 'Produto 4',
    price: 11,
    quantity: 12,
    totalPrice: 11 * 12,
  },
  {
    id: 4,
    name: 'Produto 3',
    price: 8,
    quantity: 5,
    totalPrice: 8 * 5,
  },
];

const isNumber = {
  errorMessage: 'Não é um número válido',
  validate: (value: string) => !isNaN(+value),
};

const isRequired = {
  errorMessage: 'Campo obrigatório',
  validate: (value: string) => value.length > 0,
};

const nameValidation = [isRequired];
const priceValidation = [isRequired, isNumber];
const quantityValidation = [
  isRequired,
  isNumber,
  {
    errorMessage: 'Campo deve ser inteiro',
    validate: (value: string) => !/[,|\\.]/g.test(value),
  },
  {
    errorMessage: 'Campo não pode ser 0',
    validate: (value: string) => +value > 0,
  },
];

export default function Products() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const theme = useTheme();
  const styles = useStyles(themedStyles);

  const [selectedField, setSelectedField] = React.useState<
    keyof Product | undefined
  >(undefined);

  const [searchText, setSearchText] = React.useState<string>();

  const [name, setName] = React.useState<string>();
  const [price, setPrice] = React.useState<string>();
  const [quantity, setQuantity] = React.useState<string>();

  const [isValidName, nameError] = useValidation(name, nameValidation);
  const [isValidPrice, priceError] = useValidation(price, priceValidation);
  const [isValidQuantity, quantityError] = useValidation(
    quantity,
    quantityValidation,
  );

  const onAdd = () => {
    console.log({
      name,
      price,
      quantity,
    });
  };

  const onPressSettingsIcon = React.useCallback(() => {
    router.push('/settings');
  }, []);

  const onChangePrice = React.useCallback(
    (value: string) =>
      setPrice(!/,/g.test(value) ? value : value.replaceAll(/,/g, '.')),
    [],
  );

  const onDeleteItem = React.useCallback((id: Product['id']) => id, []);
  const onIncreaseQuantity = React.useCallback((id: Product['id']) => id, []);
  const onDecreaseQuantity = React.useCallback((id: Product['id']) => id, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Icon
              name="three-bars"
              size={20}
              color={theme.secondary}
              onPress={onPressSettingsIcon}
            />
          ),
          headerSearchBarOptions: {
            onChangeText: (event) => setSearchText(event.nativeEvent.text),
          },
        }}
      />
      <View style={[styles.addForm, { marginTop: headerHeight }]}>
        <Input
          containerStyle={styles.inputStyle}
          value={name}
          error={nameError}
          onChangeText={setName}
          placeholder="Nome do produto"
        />
        <Input
          containerStyle={styles.inputStyle}
          value={price}
          error={priceError}
          onChangeText={onChangePrice}
          placeholder="Valor do produto"
          keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
        />
        <Input
          containerStyle={styles.inputStyle}
          value={quantity}
          error={quantityError}
          onChangeText={setQuantity}
          placeholder="Quantidade de produtos"
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
        />
        <Button
          label="Adicionar"
          labelStyle={styles.addButtonText}
          containerStyle={styles.addButton}
          onPress={onAdd}
          disabled={!isValidName || !isValidPrice || !isValidQuantity}
        />
      </View>
      <ProductList
        products={sampleProducts}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        onDeleteItem={onDeleteItem}
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
      marginVertical: 28,
    },
    addButtonText: {
      color: theme.primary,
      fontSize: 18,
      fontWeight: '600',
    },
  }),
);

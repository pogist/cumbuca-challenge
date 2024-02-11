import Button from '@components/Button';
import Icon from '@components/Icon';
import Input from '@components/Input';
import { ProductList } from '@components/ProductList';
import { useHeaderHeight } from '@hooks';
import { useForm, useFormErrors, useFormValidation } from '@hooks/form';
import { makeThemedStyles, useTheme } from '@theme';
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

export default function Products() {
  const theme = useTheme();
  const styles = themedStyles(theme);

  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const [selectedField, setSelectedField] = React.useState<
    keyof Product | undefined
  >(undefined);

  const [searchText, setSearchText] = React.useState<string>();

  const [form, onChangeText] = useForm({
    name: '',
    price: '',
    quantity: '',
  });

  const valid = useFormValidation(form, {
    name: (text) => {
      return text.length > 0;
    },
    price: (text) => {
      return !isNaN(+text);
    },
    quantity: (text) => {
      if (Platform.OS !== 'ios') {
        if (/[,|\\.]/g.test(text)) {
          return false;
        }
      }
      return !isNaN(+text);
    },
  });

  const errors = useFormErrors(valid, {
    price: 'Não é um número válido',
    quantity: 'Não é um número válido ou não é inteiro',
  });

  function onAdd() {}

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Icon
              name="three-bars"
              size={20}
              color={theme.colors.secondary}
              onPress={() => {
                router.push('/settings');
              }}
            />
          ),
          headerSearchBarOptions: {
            onChangeText: (event) => setSearchText(event.nativeEvent.text),
          },
        }}
      />
      <View style={[styles.addForm, { marginTop: headerHeight }]}>
        <Input
          style={styles.inputStyle}
          value={form.name}
          onChangeText={onChangeText('name')}
          placeholder="Nome do produto"
        />
        <Input
          style={styles.inputStyle}
          value={form.price}
          error={errors.price}
          onChangeText={onChangeText('price')}
          placeholder="Valor do produto"
          keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
        />
        <Input
          style={styles.inputStyle}
          value={form.quantity}
          error={errors.quantity}
          onChangeText={onChangeText('quantity')}
          placeholder="Quantidade de produtos"
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
        />
        <Button
          label="Adicionar"
          labelStyle={styles.addButtonText}
          containerStyle={styles.addButton}
          onPress={onAdd}
          disabled={!valid.name || !valid.price || !valid.quantity}
        />
      </View>
      <ProductList
        products={sampleProducts}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        onDeleteItem={(id) => id}
        onIncreaseQuantity={(id) => id}
        onDecreaseQuantity={(id) => id}
      />
    </View>
  );
}

const themedStyles = makeThemedStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    inputStyle: {
      margin: 8,
      height: 32,
    },
    addForm: {
      alignSelf: 'stretch',
    },
    addButton: {
      marginBottom: 28,
    },
    addButtonText: {
      color: theme.colors.primary,
      fontSize: 18,
      fontWeight: '600',
    },
  }),
);

import Button from '@components/Button';
import Icon from '@components/Icon';
import Input from '@components/Input';
import { useForm, useFormErrors, useFormValidation } from '@hooks/form';
import { makeThemedStyles, useTheme } from '@theme';
import { Stack, useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export default function Add() {
  const theme = useTheme();
  const styles = themedStyles(theme);
  const router = useRouter();

  const [form, onChangeText] = useForm({
    name: '',
    price: '',
    quantity: '',
  });

  const valid = useFormValidation(form, {
    price: (text) => {
      return !isNaN(+text);
    },
  });

  const errors = useFormErrors(valid, {
    price: 'Preço inválido',
  });

  function onCancel() {
    if (router.canGoBack()) {
      router.back();
    }
  }

  function onAddProduct() {
    console.log({
      name: form.name,
      price: form.price,
      quantity: form.quantity,
    });
  }

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Icon
              name="x"
              size={24}
              color={theme.colors.secondary}
              onPress={onCancel}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.form}>
          <Input
            value={form.name}
            onChangeText={onChangeText('name')}
            label="Nome"
            placeholder="Digite o nome do produto..."
          />
          <Input
            value={form.price}
            error={errors.price}
            onChangeText={(text) => {
              onChangeText('price')(text.replaceAll(/,/g, '.'));
            }}
            label="Valor"
            placeholder="Digite o valor do produto..."
            keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
          />
          <Input
            value={form.quantity}
            onChangeText={onChangeText('quantity')}
            label="Quantidade em estoque"
            placeholder="Digite a quantidade em estoque..."
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          />
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Button
            label="ADICIONAR"
            onPress={onAddProduct}
            labelStyle={styles.addLabel}
            containerStyle={styles.addContainer}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const themedStyles = makeThemedStyles((theme) =>
  StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.colors.background,
    },
    label: {
      color: theme.colors.primaryText,
    },
    form: {
      gap: 12,
      alignSelf: 'stretch',
      justifyContent: 'space-between',
    },
    footer: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addLabel: {
      color: '#ffffff',
      fontSize: 16,
    },
    addContainer: {
      height: 42,
      borderRadius: 10,
      alignSelf: 'stretch',
      backgroundColor: theme.colors.primary,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
  }),
);

import Button from '@components/Button';
import Input from '@components/Input';
import { minLength, useFormReducer } from '@form';
import { makeThemedStyles, useTheme } from '@theme';
import { isEmpty } from '@util';
import { router } from 'expo-router';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Login() {
  const theme = useTheme();
  const styles = themedStyles(theme);

  const [formState, dispatch] = useFormReducer({
    cpf: {
      value: '',
      rules: [],
    },
    password: {
      value: '',
      rules: [
        {
          validate: minLength(8),
          errorMessage: 'Mínimo de 8 dígitos',
        },
      ],
    },
  });

  const shouldDisableSubmit =
    isEmpty(formState.cpf.value) ||
    isEmpty(formState.password.value) ||
    !formState.cpf.isValid ||
    !formState.password.isValid;

  function onCreateAccountPress() {
    router.push('/auth/register');
  }

  function onLoginPress() {
    console.log(JSON.stringify(formState, null, 2));
  }

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <KeyboardAvoidingView
          style={styles.form}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Input
            value={formState.cpf.value}
            error={formState.cpf.error}
            onChangeText={(value) => dispatch({ field: 'cpf', value })}
            label="CPF"
            placeholder="Ex.: 000.000.000-00"
            keyboardType="number-pad"
            maxLength={11}
          />
          <Input
            value={formState.password.value}
            error={formState.password.error}
            onChangeText={(value) => dispatch({ field: 'password', value })}
            label="Senha"
            placeholder="Digite sua senha..."
            secureTextEntry
          />
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Button
            label="LOGIN"
            onPress={onLoginPress}
            disabled={shouldDisableSubmit}
            labelStyle={styles.loginLabel}
            containerStyle={styles.loginContainer}
          />
          <Button
            label="Criar conta"
            onPress={onCreateAccountPress}
            labelStyle={styles.registerLabel}
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
    header: {
      color: theme.colors.primaryText,
      fontSize: 32,
      fontWeight: '600',
    },
    form: {
      gap: 12,
      alignSelf: 'stretch',
      justifyContent: 'space-between',
    },
    footer: {
      gap: 12,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginLabel: {
      color: '#ffffff',
      fontSize: 16,
    },
    loginContainer: {
      height: 42,
      borderRadius: 10,
      alignSelf: 'stretch',
      backgroundColor: theme.colors.primary,
    },
    registerLabel: {
      color: theme.colors.primary,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
  }),
);

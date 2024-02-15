import Button from '@components/Button';
import Input from '@components/Input';
import { useValidation } from '@hooks';
import settings from '@storage/settings';
import { createStyles, useStyles } from '@theming';
import { compose, isCPF, isEmpty, replace } from '@util';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
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
  const router = useRouter();
  const styles = useStyles(themedStyles);

  React.useEffect(() => {
    settings.getBioAuth().then((enabled) => {
      if (enabled) {
        LocalAuthentication.authenticateAsync().then((result) => {
          if (result.success) {
            router.push('/products');
          }
        });
      }
    });
  }, [router]);

  const [cpf, setCPF] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const [isCPFValid, cpfError] = useValidation(cpf, [
    {
      validate: isCPF,
      errorMessage: 'CPF inválido',
    },
  ]);

  const [isPasswordValid, passwordError] = useValidation(password, [
    {
      validate: (value) => value.length >= 8,
      errorMessage: 'Mínimo de 8 caracteres',
    },
  ]);

  const setMaskedCPF = React.useCallback(
    compose<string, void>(
      setCPF,
      replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
      replace(/(\d{3})(\d)/, '$1.$2'),
      replace(/(\d{3})(\d)/, '$1.$2'),
      replace(/\D/g, ''),
    ),
    [],
  );

  const onLogin = () => {
    console.log({ cpf, password });
    router.navigate('/products');
  };

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
            value={cpf}
            error={!isEmpty(cpf) ? cpfError : ''}
            onChangeText={setMaskedCPF}
            label="CPF"
            placeholder="000.000.000-00"
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            maxLength={14}
          />
          <Input
            value={password}
            error={!isEmpty(password) ? passwordError : ''}
            onChangeText={setPassword}
            label="Senha"
            placeholder="Digite sua senha..."
            secureTextEntry
          />
        </KeyboardAvoidingView>
        <Button
          label="LOGIN"
          onPress={onLogin}
          disabled={!isCPFValid || !isPasswordValid}
          labelStyle={styles.loginLabel}
          containerStyle={styles.loginContainer}
        />
      </View>
    </ScrollView>
  );
}

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.background,
    },
    header: {
      color: theme.primaryText,
      fontSize: 32,
      fontWeight: '600',
    },
    form: {
      gap: 12,
      alignSelf: 'stretch',
      justifyContent: 'space-between',
    },
    loginLabel: {
      color: theme.primaryText,
      fontSize: 16,
    },
    loginContainer: {
      height: 42,
      borderRadius: 10,
      alignSelf: 'stretch',
      backgroundColor: theme.primary,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
  }),
);

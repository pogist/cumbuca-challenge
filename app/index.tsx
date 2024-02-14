import Button from '@components/Button';
import Input from '@components/Input';
import { useValidation } from '@hooks';
import { createStyles, useStyles } from '@theming';
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

  const [cpf, setCPF] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const [isCPFValid, cpfError] = useValidation(cpf, [
    {
      errorMessage: 'CPF inválido',
      validate: (value) => !(value.length < 11),
    },
  ]);

  const [isPasswordValid, passwordError] = useValidation(password, [
    {
      errorMessage: 'Mínimo de 8 caracteres',
      validate: (value) => value.length >= 8,
    },
  ]);

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
            error={cpfError}
            onChangeText={setCPF}
            label="CPF"
            placeholder="Ex.: 000.000.000-00"
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            maxLength={11}
          />
          <Input
            value={password}
            error={passwordError}
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

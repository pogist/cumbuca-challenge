import Button from '@components/Button';
import Input from '@components/Input';
import { useCPFValidation, useMinLength } from '@hooks/auth';
import { useForm } from '@hooks/form';
import { makeThemedStyles, useTheme } from '@theme';
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
  const theme = useTheme();
  const styles = themedStyles(theme);
  const router = useRouter();

  const [form, setForm] = useForm({
    cpf: '',
    password: '',
  });

  const [isCPFValid, cpfError] = useCPFValidation(form.cpf);
  const [isPasswordValid, passwordError] = useMinLength(form.password, 8);

  const disabled = !isCPFValid || !isPasswordValid;

  function onLogin() {
    console.log(form);
    // router.push('/products/');
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
            value={form.cpf}
            error={cpfError}
            onChangeText={setForm('cpf')}
            label="CPF"
            placeholder="Ex.: 000.000.000-00"
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            maxLength={11}
          />
          <Input
            value={form.password}
            error={passwordError}
            onChangeText={setForm('password')}
            label="Senha"
            placeholder="Digite sua senha..."
            secureTextEntry
          />
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Button
            label="LOGIN"
            onPress={onLogin}
            disabled={disabled}
            labelStyle={styles.loginLabel}
            containerStyle={styles.loginContainer}
          />
          <Button
            label="Criar conta"
            onPress={() => router.push('/auth/register')}
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

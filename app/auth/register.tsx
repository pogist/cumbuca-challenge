import Button from '@components/Button';
import Input from '@components/Input';
import { useCPFValidation, useEqualPasswords, useMinLength } from '@hooks/auth';
import { useForm } from '@hooks/form';
import { useHeaderHeight } from '@react-navigation/elements';
import { makeThemedStyles, useTheme } from '@theme';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export default function Register() {
  const theme = useTheme();
  const styles = themedStyles(theme);
  const headerHeight = useHeaderHeight();

  const [form, setForm] = useForm({
    cpf: '',
    password: '',
    repeatedPassword: '',
  });

  const [isCPFValid, cpfError] = useCPFValidation(form.cpf);
  const [isPasswordValid, passwordError] = useMinLength(form.password, 8);
  const [isRepeatedPasswordValid, repeatedPasswordError] = useEqualPasswords(
    form.password,
    form.repeatedPassword,
  );

  const disabled = !isCPFValid || !isPasswordValid || !isRepeatedPasswordValid;

  function onCreateAccount() {
    console.log(form);
  }

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.form}
          keyboardVerticalOffset={headerHeight + 12}
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
          <Input
            value={form.password}
            error={repeatedPasswordError}
            onChangeText={setForm('repeatedPassword')}
            label="Repetir senha"
            placeholder="Repita sua senha..."
            secureTextEntry
          />
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Button
            label="CRIAR CONTA"
            onPress={onCreateAccount}
            disabled={disabled}
            labelStyle={styles.createAccountLabel}
            containerStyle={styles.createAccountContainer}
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
    createAccountLabel: {
      color: '#ffffff',
      fontSize: 16,
    },
    createAccountContainer: {
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

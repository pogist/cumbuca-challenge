import Button from '@components/Button';
import Input from '@components/Input';
import { useHeaderHeight } from '@react-navigation/elements';
import { makeThemedStyles, useTheme } from '@theme';
import { isEmpty, useMinLength } from '@util';
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

  const [cpf, setCpf] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordValid, passwordError] = useMinLength(password, 8);

  const disabled = isEmpty(cpf) || isEmpty(password) || !isPasswordValid;

  function onCreateAccount() {
    console.log({
      cpf,
      password,
    });
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
            value={cpf}
            onChangeText={setCpf}
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
        <View style={styles.footer}>
          <Button
            label="CRIAR CONTA"
            onPress={onCreateAccount}
            disabled={disabled}
            labelStyle={styles.registerLabel}
            containerStyle={styles.registerContainer}
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
    registerLabel: {
      color: '#ffffff',
      fontSize: 16,
    },
    registerContainer: {
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

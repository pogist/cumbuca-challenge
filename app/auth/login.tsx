import Button from '@components/Button';
import Input from '@components/Input';
import { makeThemedStyles, useTheme } from '@theme';
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
  const gotoRegister = React.useCallback(() => {
    router.push('/auth/register');
  }, []);
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
            label="CPF"
            error=""
            placeholder="Ex.: 000.000.000-00"
            keyboardType="number-pad"
          />
          <Input
            label="Senha"
            error=""
            placeholder="Digite sua senha..."
            secureTextEntry
          />
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Button
            label="LOGIN"
            labelStyle={styles.loginLabel}
            containerStyle={styles.loginContainer}
          />
          <Button
            label="Criar conta"
            onPress={gotoRegister}
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

import Button from '@components/Button';
import TextField from '@components/TextField';
import { createThemedStyle, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Login() {
  const theme = useTheme();
  const styles = themedStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.form}>
        <TextField label="CPF" placeholder="Ex.: 000.000.000-00" error={null} />
        <TextField
          label="Senha"
          placeholder="Digite sua senha..."
          error={null}
        />
      </View>
      <View style={styles.footer}>
        <Button
          label="LOGIN"
          labelStyle={styles.loginLabel}
          containerStyle={styles.loginContainer}
        />
        <Button label="Criar conta" labelStyle={styles.registerLabel} />
      </View>
    </View>
  );
}

const themedStyles = createThemedStyle((theme) =>
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
      gap: 16,
      alignSelf: 'stretch',
      justifyContent: 'space-between',
    },
    footer: {
      gap: 16,
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
  }),
);

import Button from '@components/Button';
import TextField from '@components/TextField';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Login() {
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
        <Button label="Criar conta" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  header: {
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
    color: 'white',
    fontSize: 16,
  },
  loginContainer: {
    height: 42,
    borderRadius: 10,
    alignSelf: 'stretch',
    backgroundColor: 'black',
  },
});

import Button from '@components/Button';
import Input from '@components/Input';
import { useValidation } from '@hooks';
import loginStorage from '@storage/login';
import settings from '@storage/settings';
import { createStyles, useStyles } from '@theming';
import { compose, isCPF, isEmpty, isNullable, replace } from '@util';
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

  const [lastAccess, setLastAccess] = React.useState<string>();

  React.useEffect(() => {
    loginStorage.get().then((login) => {
      if (!isNullable(login)) {
        setLastAccess(login.lastAccessedAt.toISOString());
      }
    });
    settings.getBioAuth().then((enabled) => {
      if (enabled) {
        LocalAuthentication.authenticateAsync()
          .then((result) => {
            if (result.success) {
              return loginStorage.get();
            }
            return null;
          })
          .then((persistedLogin) => {
            if (!isNullable(persistedLogin)) {
              loginStorage
                .set({
                  ...persistedLogin,
                  lastAccessedAt: new Date(Date.now()),
                })
                .then(() => router.push('/products'));
            }
          });
      }
    });
  }, []);

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

  const [cpfLoginError, setCPFLoginError] = React.useState<string>();
  const [passwordLoginError, setPasswordLoginError] = React.useState<string>();

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

  const onLogin = async () => {
    const persistedLogin = await loginStorage.get();
    if (isNullable(persistedLogin)) {
      if (cpf && password) {
        await loginStorage.set({
          cpf,
          password,
          lastAccessedAt: new Date(Date.now()),
        });
        router.push('/products');
      }
    } else {
      if (cpf && password) {
        if (cpf !== persistedLogin.cpf) {
          setCPFLoginError('CPF incorreto');
        } else if (password !== persistedLogin.password) {
          setPasswordLoginError('Senha incorreta');
        } else {
          await loginStorage.set({
            ...persistedLogin,
            lastAccessedAt: new Date(Date.now()),
          });
          router.push('/products');
        }
      }
    }
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
            error={
              cpfLoginError ? cpfLoginError : !isEmpty(cpf) ? cpfError : ''
            }
            onChangeText={setMaskedCPF}
            label="CPF"
            placeholder="000.000.000-00"
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            maxLength={14}
          />
          <Input
            value={password}
            error={
              passwordLoginError
                ? passwordLoginError
                : !isEmpty(password)
                  ? passwordError
                  : ''
            }
            onChangeText={setPassword}
            label="Senha"
            placeholder="Digite sua senha..."
            secureTextEntry
          />
        </KeyboardAvoidingView>
        <View style={styles.loginContainer}>
          <Button
            label="LOGIN"
            onPress={onLogin}
            disabled={!isCPFValid || !isPasswordValid}
            labelStyle={styles.buttonLabel}
            containerStyle={styles.buttonContainer}
          />
          {lastAccess && <LastAccessLabel dateString={lastAccess} />}
        </View>
      </View>
    </ScrollView>
  );
}

function LastAccessLabel({ dateString }: { dateString: string }) {
  const styles = useStyles(themedStyles);
  const getDate = (): string =>
    new Date(dateString).toLocaleDateString('pt-BR');
  const getTime = (): string =>
    new Date(dateString).toLocaleTimeString('pt-BR');
  return (
    <View style={styles.lastAccessContainer}>
      <Text style={styles.lastAccessLabel}>
        Último accesso em {getDate()} às {getTime()}
      </Text>
    </View>
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
    loginContainer: {
      gap: 12,
      alignSelf: 'stretch',
    },
    buttonLabel: {
      color: theme.primaryText,
      fontSize: 16,
    },
    buttonContainer: {
      height: 42,
      borderRadius: 10,
      backgroundColor: theme.primary,
    },
    lastAccessLabel: {
      color: theme.secondaryText,
      fontSize: 12,
    },
    lastAccessContainer: {
      alignItems: 'center',
    },
    scrollViewContent: {
      flexGrow: 1,
    },
  }),
);

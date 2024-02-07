import Button from '@components/Button';
import TextField from '@components/TextField';
import { useHeaderHeight } from '@react-navigation/elements';
import { makeThemedStyles, useTheme } from '@theme';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

export default function Register() {
  const theme = useTheme();
  const styles = themedStyles(theme);
  const headerHeight = useHeaderHeight();
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.form}
        keyboardVerticalOffset={headerHeight + 12}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextField label="CPF" placeholder="Ex.: 000.000.000-00" error={null} />
        <TextField
          label="Senha"
          placeholder="Digite sua senha..."
          error={null}
        />
        <TextField
          label="Repetir senha"
          placeholder="Repita sua senha..."
          error={null}
        />
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <Button
          label="CRIAR CONTA"
          labelStyle={styles.registerLabel}
          containerStyle={styles.registerContainer}
        />
      </View>
    </View>
  );
}

const themedStyles = makeThemedStyles((theme) =>
  StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
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
  }),
);

import Button from '@components/Button';
import Input from '@components/Input';
import { minLength, useFormReducer } from '@form';
import { useHeaderHeight } from '@react-navigation/elements';
import { makeThemedStyles, useTheme } from '@theme';
import { isEmpty } from '@util';
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

  const [formState, dispatch] = useFormReducer({
    cpf: {
      value: '',
      rules: [],
    },
    password: {
      value: '',
      rules: [
        {
          validate: minLength(8),
          errorMessage: 'Mínimo de 8 dígitos',
        },
      ],
    },
  });

  const shouldDisableSubmit =
    isEmpty(formState.cpf.value) ||
    isEmpty(formState.password.value) ||
    !formState.cpf.isValid ||
    !formState.password.isValid;

  function onCreateAccountPress() {
    console.log(JSON.stringify(formState, null, 2));
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
            value={formState.cpf.value}
            error={formState.cpf.error}
            onChangeText={(value) => dispatch({ field: 'cpf', value })}
            label="CPF"
            placeholder="Ex.: 000.000.000-00"
            keyboardType="number-pad"
            maxLength={11}
          />
          <Input
            value={formState.password.value}
            error={formState.password.error}
            onChangeText={(value) => dispatch({ field: 'password', value })}
            label="Senha"
            placeholder="Digite sua senha..."
            secureTextEntry
          />
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Button
            label="CRIAR CONTA"
            onPress={onCreateAccountPress}
            disabled={shouldDisableSubmit}
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

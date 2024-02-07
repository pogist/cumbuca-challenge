import { makeThemedStyles, useTheme } from '@theme';
import { Slot } from 'expo-router';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

export default function AuthLayout() {
  const theme = useTheme();
  const styles = themedStyles(theme);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Slot />
    </KeyboardAvoidingView>
  );
}

const themedStyles = makeThemedStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  }),
);

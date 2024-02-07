import { useTheme, makeThemedStyles } from '@theme';
import { View, Text, StyleSheet } from 'react-native';

export default function Register() {
  const theme = useTheme();
  const styles = themedStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register Page</Text>
    </View>
  );
}

const themedStyles = makeThemedStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    text: {
      color: theme.colors.primaryText,
    },
  }),
);

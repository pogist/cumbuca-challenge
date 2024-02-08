import { useTheme, makeThemedStyles } from '@theme';
import { StyleSheet, Text, View } from 'react-native';

export default function Settings() {
  const theme = useTheme();
  const styles = themedStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Settings Page</Text>
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
    label: {
      color: theme.colors.primaryText,
    },
  }),
);

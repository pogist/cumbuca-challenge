import { createStyles, useStyles } from '@theming';
import { StyleSheet, Text, View } from 'react-native';

export default function Settings() {
  const styles = useStyles(themedStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Settings Page</Text>
    </View>
  );
}

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.background,
    },
    label: {
      color: theme.primaryText,
    },
  }),
);

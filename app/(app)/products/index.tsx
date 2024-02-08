import { makeThemedStyles, useTheme } from '@theme';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Products() {
  const theme = useTheme();
  const styles = themedStyles(theme);
  const router = useRouter();
  function onGotoAdd() {
    router.push('/products/add');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Products Page</Text>
      <Pressable onPress={onGotoAdd}>
        <Text style={styles.label}>Go to add</Text>
      </Pressable>
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

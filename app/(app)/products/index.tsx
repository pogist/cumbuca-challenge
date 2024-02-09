import Icon from '@components/Icon';
import { makeThemedStyles, useTheme } from '@theme';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Products() {
  const theme = useTheme();
  const styles = themedStyles(theme);

  const router = useRouter();
  const [searchText, setSearchText] = React.useState('');

  function onChangeSearchText(text: string) {
    setSearchText(text);
  }

  function onGotoAdd() {
    router.push('/products/add');
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Icon
              name="plus"
              size={24}
              color={theme.colors.secondary}
              onPress={onGotoAdd}
            />
          ),
          headerSearchBarOptions: {
            onChangeText: (event) => onChangeSearchText(event.nativeEvent.text),
          },
        }}
      />
      <Text style={styles.label}>{searchText}</Text>
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

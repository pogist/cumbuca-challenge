import { Octicons } from '@expo/vector-icons';
import { ThemeProvider, darkTheme, lightTheme } from '@theme';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function AppLayout() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  React.useEffect(() => {
    (async () => await Font.loadAsync({ ...Octicons.font }))();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background as string,
          },
          headerTitleStyle: {
            color: theme.colors.primaryText as string,
          },
          headerTintColor: theme.colors.secondary as string,
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="products"
          options={{
            title: 'Produtos',
            gestureEnabled: false,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Ajustes',
            headerSearchBarOptions: undefined,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

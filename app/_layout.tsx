import { Octicons } from '@expo/vector-icons';
import settings from '@storage/settings';
import { ThemeProvider, darkTheme, lightTheme } from '@theming';
import * as Font from 'expo-font';
import * as LocalAuthentication from 'expo-local-authentication';
import { Stack } from 'expo-router';
import React from 'react';
import { Appearance, useColorScheme } from 'react-native';

export default function AppLayout() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  React.useEffect(() => {
    Font.loadAsync({ ...Octicons.font }).then();
    LocalAuthentication.isEnrolledAsync().then((isEnrolled) =>
      settings.setBioAuthSupported(isEnrolled),
    );
    settings.getDarkThemeEnabled().then((isDarkTheme) => {
      Appearance.setColorScheme(isDarkTheme ? 'dark' : 'light');
    });
  }, []);

  return (
    <ThemeProvider value={theme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background as string,
          },
          headerTitleStyle: {
            color: theme.primaryText as string,
          },
          headerTintColor: theme.secondary as string,
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

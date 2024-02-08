import { Octicons } from '@expo/vector-icons';
import { ThemeProvider, darkTheme, lightTheme } from '@theme';
import * as Font from 'expo-font';
import { Slot } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

async function preloadIcons() {
  await Font.loadAsync({ ...Octicons.font });
}

export default function RootLayout() {
  const scheme = useColorScheme();
  React.useEffect(() => {
    preloadIcons();
  }, []);
  return (
    <ThemeProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <Slot />
    </ThemeProvider>
  );
}

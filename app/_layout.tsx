import { ThemeProvider, darkTheme, lightTheme } from '@theme';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <Slot />
    </ThemeProvider>
  );
}

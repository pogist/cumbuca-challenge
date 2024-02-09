import { stackScreenOptions } from '@navigation';
import { useTheme } from '@theme';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  const theme = useTheme();
  return (
    <Stack screenOptions={stackScreenOptions(theme)}>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Criar conta',
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}

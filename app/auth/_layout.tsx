import { useTheme } from '@theme';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  const theme = useTheme();
  return (
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
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Criar conta',
        }}
      />
    </Stack>
  );
}

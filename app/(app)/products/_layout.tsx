import { Stack } from 'expo-router';

export default function ProductsLayout() {
  return (
    <Stack>
      <Stack.Screen name="add" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

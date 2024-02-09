import { stackScreenOptions } from '@navigation';
import { useTheme } from '@theme';
import { Stack } from 'expo-router';

export default function ProductsLayout() {
  const theme = useTheme();
  return (
    <Stack screenOptions={stackScreenOptions(theme)}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Produtos',
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          presentation: 'modal',
          headerTitle: 'Adicionar Produto',
        }}
      />
    </Stack>
  );
}

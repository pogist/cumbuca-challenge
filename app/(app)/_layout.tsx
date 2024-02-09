import TabBarButton from '@components/TabBarButton';
import { Octicons } from '@expo/vector-icons';
import { tabsScreenOptions } from '@navigation';
import { useTheme } from '@theme';
import { Tabs } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  const theme = useTheme();
  return (
    <Tabs screenOptions={tabsScreenOptions(theme)}>
      <Tabs.Screen
        name="products"
        options={{
          headerShown: false,
          tabBarLabel: 'Produtos',
          tabBarButton: (props) => <TabBarButton {...props} />,
          tabBarIcon: ({ size, color }) => (
            <Octicons name="list-unordered" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: 'Ajustes',
          tabBarLabel: 'Ajustes',
          tabBarButton: (props) => <TabBarButton {...props} />,
          tabBarIcon: ({ size, color }) => (
            <Octicons name="gear" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

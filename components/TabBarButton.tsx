import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export type TabBarButtonProps = BottomTabBarButtonProps;

const TabBarButton: React.FC<TabBarButtonProps> = ({
  children,
  onPress,
  onLongPress,
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
}) => {
  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}>
      <Pressable
        style={styles.pressable}
        onPress={onPress}
        onLongPress={onLongPress}>
        {children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pressable: {
    flexGrow: 0.85,
  },
});

export default TabBarButton;

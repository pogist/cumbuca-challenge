import { Octicons } from '@expo/vector-icons';
import React from 'react';
import {
  ColorValue,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

export interface IconProps {
  name: React.ComponentProps<typeof Octicons>['name'];
  size: number;
  color?: ColorValue;
  onPress?: () => void;
  disabled?: boolean;
}

const Icon: React.FC<IconProps> = ({ onPress, disabled, ...props }) => {
  const containerStyle = ({ pressed }: { pressed: boolean }) => {
    const style: StyleProp<ViewStyle> = [
      styles.container,
      { width: props.size },
    ];
    if (disabled) {
      style.push(styles.disabled);
    } else if (pressed) {
      style.push(styles.pressed);
    }
    return style;
  };
  return (
    <Pressable style={containerStyle} onPress={onPress} disabled={disabled}>
      <Octicons {...props} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Icon;

import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

function arePropsEqual(prev: ButtonProps, next: ButtonProps) {
  return (
    prev.label === next.label &&
    prev.disabled === next.disabled &&
    Object.is(prev.labelStyle, next.labelStyle) &&
    Object.is(prev.containerStyle, next.containerStyle)
  );
}

const Button: React.FC<ButtonProps> = React.memo(
  ({
    label,
    onPress,
    disabled,
    labelStyle: overrideLabelStyle,
    containerStyle: overrideContainerStyle,
  }) => {
    const labelStyle = !overrideLabelStyle
      ? styles.label
      : [styles.label, overrideLabelStyle];

    const containerStyle = ({ pressed }: { pressed: boolean }) => {
      const style: ViewStyle[] = !overrideContainerStyle
        ? [styles.container]
        : [styles.container, overrideContainerStyle];
      if (disabled) {
        style.push(styles.disabled);
      } else if (pressed) {
        style.push(styles.pressed);
      }
      return style;
    };

    return (
      <Pressable style={containerStyle} onPress={onPress} disabled={disabled}>
        <Text style={labelStyle}>{label}</Text>
      </Pressable>
    );
  },
  arePropsEqual,
);

Button.displayName = 'Button';

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
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Button;

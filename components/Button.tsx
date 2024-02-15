import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface ButtonProps {
  testID: string;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  testID,
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
    <Pressable
      testID={testID}
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}>
      <Text testID={`${testID}.label`} style={labelStyle}>
        {label}
      </Text>
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
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Button;

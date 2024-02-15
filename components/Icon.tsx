import { Octicons } from '@expo/vector-icons';
import React from 'react';
import {
  ColorValue,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface IconProps {
  testID: string;
  name: React.ComponentProps<typeof Octicons>['name'];
  color?: ColorValue;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  noFeedback?: boolean;
  size?: number;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const Icon: React.FC<IconProps> = ({
  testID,
  containerStyle,
  disabled,
  noFeedback,
  onPress,
  ...props
}) => {
  const pressableStyle = ({ pressed }: { pressed: boolean }) => {
    const style: StyleProp<ViewStyle> = [styles.container, containerStyle];
    if (props.size && (!props.style || !containerStyle)) {
      style.push({ width: props.size });
    }
    if (noFeedback) {
      return style;
    }
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
      style={pressableStyle}
      onPress={onPress}
      disabled={disabled}>
      <Octicons testID={`${testID}.vector_icon`} {...props} />
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

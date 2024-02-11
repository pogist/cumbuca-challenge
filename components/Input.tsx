import { useIsFirstRender } from '@hooks';
import { makeThemedStyles, useTheme } from '@theme';
import { isEmpty } from '@util';
import React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

/// See: https://reactnative.dev/docs/textinput#style
type BaseTextInputStyle = TextStyle & ViewStyle;
export type TextInputStyle = Omit<
  BaseTextInputStyle,
  | 'borderLeftWidth'
  | 'borderTopWidth'
  | 'borderRightWidth'
  | 'borderBottomWidth'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderBottomRightRadius'
  | 'borderBottomLeftRadius'
>;

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  style?: StyleProp<TextInputStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  containerStyle,
  keyboardType,
  ...props
}) => {
  const theme = useTheme();
  const styles = themedStyles(theme);

  const textLabelStyle: StyleProp<TextStyle> = [styles.textLabel];
  const textInputStyle = !style
    ? [styles.textInput]
    : [styles.textInput, style];

  if (keyboardType && numericKeyboardTypes.includes(keyboardType)) {
    textInputStyle.push(styles.numericInput);
  }

  const isFirstRender = useIsFirstRender();
  if (!isFirstRender && !isEmpty(error)) {
    textInputStyle.push(styles.erroredTextInput);
    textLabelStyle.push(styles.erroredTextLabel);
  }

  return (
    <View style={containerStyle ?? []}>
      {label && <Text style={textLabelStyle}>{label}</Text>}
      <TextInput
        style={textInputStyle}
        placeholderTextColor={theme.colors.secondaryText}
        {...props}
      />
      <Text style={styles.textError}>{!isFirstRender ? error : ''}</Text>
    </View>
  );
};

const numericKeyboardTypes: KeyboardTypeOptions[] = [
  'numeric',
  'number-pad',
  'decimal-pad',
  'numbers-and-punctuation',
];

const themedStyles = makeThemedStyles((theme) =>
  StyleSheet.create({
    textInput: {
      color: theme.colors.primaryText,
      borderColor: theme.colors.border,
      borderRadius: 10,
      borderWidth: 1,
      height: 40,
      padding: 10,
    },
    numericInput: {
      fontVariant: ['tabular-nums'],
    },
    erroredTextInput: {
      borderColor: theme.colors.failure,
    },
    textLabel: {
      color: theme.colors.primaryText,
      fontWeight: '500',
      marginBottom: 8,
      marginHorizontal: 10,
    },
    erroredTextLabel: {
      color: theme.colors.failure,
    },
    textError: {
      color: theme.colors.failure,
      fontSize: 10,
      fontWeight: '500',
      marginTop: 4,
      marginHorizontal: 10,
    },
  }),
);

export default Input;

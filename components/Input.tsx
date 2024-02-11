import { useIsFirstRender } from '@hooks';
import { createStyles, useStyles, useTheme } from '@theming';
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

const Input: React.FC<InputProps> = React.memo(
  ({ label, error, style, containerStyle, keyboardType, ...props }) => {
    const theme = useTheme();
    const styles = useStyles(themedStyles);

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
          placeholderTextColor={theme.secondaryText}
          {...props}
        />
        <Text style={styles.textError}>{!isFirstRender ? error : ''}</Text>
      </View>
    );
  },
);

Input.displayName = 'Input';

const numericKeyboardTypes: KeyboardTypeOptions[] = [
  'numeric',
  'number-pad',
  'decimal-pad',
  'numbers-and-punctuation',
];

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    textInput: {
      color: theme.primaryText,
      borderColor: theme.border,
      borderRadius: 10,
      borderWidth: 1,
      height: 40,
      padding: 10,
    },
    numericInput: {
      fontVariant: ['tabular-nums'],
    },
    erroredTextInput: {
      borderColor: theme.danger,
    },
    textLabel: {
      color: theme.primaryText,
      fontWeight: '500',
      marginBottom: 8,
      marginHorizontal: 10,
    },
    erroredTextLabel: {
      color: theme.danger,
    },
    textError: {
      color: theme.danger,
      fontSize: 10,
      fontWeight: '500',
      marginTop: 4,
      marginHorizontal: 10,
    },
  }),
);

export default Input;

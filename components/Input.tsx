import { useTheme, makeThemedStyles } from '@theme';
import { isEmpty, useIsFirstRender } from '@util';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TextInput,
  TextInputProps,
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
  label: string;
  error?: string;
  style?: StyleProp<TextInputStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const arePropsEqual = (
  prevProps: InputProps,
  nextProps: InputProps,
): boolean => {
  return prevProps.value === nextProps.value;
};

const Input: React.FC<InputProps> = React.memo(
  ({ label, error, style, containerStyle, ...props }) => {
    const theme = useTheme();
    const styles = themedStyles(theme);

    const textLabelStyle: StyleProp<TextStyle> = [styles.textLabel];
    const textInputStyle = !style
      ? [styles.textInput]
      : [styles.textInput, style];

    const isFirstRender = useIsFirstRender();
    if (!isFirstRender && !isEmpty(error)) {
      textInputStyle.push(styles.erroredTextInput);
      textLabelStyle.push(styles.erroredTextLabel);
    }

    return (
      <View style={containerStyle ?? []}>
        <Text style={textLabelStyle}>{label}</Text>
        <TextInput
          style={textInputStyle}
          placeholderTextColor={theme.colors.secondaryText}
          {...props}
        />
        <Text style={styles.textError}>{!isFirstRender ? error : ''}</Text>
      </View>
    );
  },
  arePropsEqual,
);

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

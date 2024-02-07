import { makeThemedStyles, useTheme } from '@theme';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

export interface TextFieldProps extends TextInputProps {
  label: string;
  error: string | null;
  containerStyle?: ViewStyle;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  containerStyle,
  ...inputProps
}) => {
  const theme = useTheme();
  const styles = themedStyles(theme);

  const inputStyle = !error ? styles.input : [styles.input, styles.errorInput];
  const labelStyle = !error ? styles.label : [styles.label, styles.errorLabel];

  return (
    <View style={containerStyle ?? []}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        style={inputStyle}
        placeholderTextColor={theme.colors.secondaryText}
        {...inputProps}
      />
      <Text style={styles.errorText}>{error ? error : ''}</Text>
    </View>
  );
};

const themedStyles = makeThemedStyles((theme) =>
  StyleSheet.create({
    input: {
      color: theme.colors.primaryText,
      borderColor: theme.colors.border,
      borderRadius: 10,
      borderWidth: 1,
      height: 40,
      padding: 10,
    },
    errorInput: {
      borderColor: theme.colors.failure,
    },
    label: {
      color: theme.colors.primaryText,
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 8,
      marginHorizontal: 10,
    },
    errorLabel: {
      color: theme.colors.failure,
    },
    errorText: {
      color: theme.colors.failure,
      fontSize: 10,
      fontWeight: '500',
      marginTop: 4,
      marginHorizontal: 10,
    },
  }),
);

export default TextField;

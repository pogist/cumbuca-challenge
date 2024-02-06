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
  const inputStyle = !error ? styles.input : [styles.input, styles.errorInput];
  const labelStyle = !error ? styles.label : [styles.label, styles.errorLabel];
  return (
    <View style={containerStyle ?? []}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput style={inputStyle} {...inputProps} />
      <Text style={styles.errorText}>{error ? error : ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    padding: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginHorizontal: 10,
  },
  errorLabel: {
    color: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
    marginHorizontal: 10,
  },
});

export default TextField;

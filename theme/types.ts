import { ColorValue } from 'react-native';

export interface Theme {
  isDark: boolean;
  colors: {
    background: ColorValue;
    border: ColorValue;
    failure: ColorValue;
    primary: ColorValue;
    primaryText: ColorValue;
    secondary: ColorValue;
    secondaryText: ColorValue;
  };
}

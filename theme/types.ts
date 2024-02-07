import { ColorValue } from 'react-native';

export interface Theme {
  colors: {
    background: ColorValue;
    border: ColorValue;
    failure: ColorValue;
    primary: ColorValue;
    primaryLight: ColorValue;
    primaryText: ColorValue;
    secondary: ColorValue;
    secondaryLight: ColorValue;
    secondaryText: ColorValue;
  };
}

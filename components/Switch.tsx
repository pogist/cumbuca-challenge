import React from 'react';
import { ColorValue, Platform, Switch as RNSwitch } from 'react-native';

export interface SwitchProps {
  testID: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  trueColor: ColorValue;
  falseColor: ColorValue;
}

const Switch: React.FC<SwitchProps> = ({
  testID,
  value,
  onValueChange,
  trueColor,
  falseColor,
}) => {
  const colorProps = Platform.select({
    ios: {
      trackColor: {
        true: trueColor,
      },
      ios_backgroundColor: falseColor,
    },
    android: {
      trackColor: {
        true: trueColor,
        false: falseColor,
      },
    },
  });
  return (
    <RNSwitch
      testID={testID}
      value={value}
      onValueChange={onValueChange}
      {...colorProps}
    />
  );
};

export default Switch;

import React from 'react';
import { StyleSheet } from 'react-native';

import { Theme } from './types';
import { useTheme } from './useTheme';

export function useStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  createStyles: (
    theme: Theme,
  ) => T | StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
) {
  const theme = useTheme();
  return React.useMemo(() => createStyles(theme), [theme]);
}

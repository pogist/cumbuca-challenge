import { StyleSheet } from 'react-native';

import { Theme } from './types';

export function createStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  create: (
    theme: Theme,
  ) => T | StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
) {
  return create;
}

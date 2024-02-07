import { StyleSheet } from 'react-native';

import { Theme } from './types';

export function makeThemedStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(themedStylesMaker: (theme: Theme) => T) {
  return themedStylesMaker;
}

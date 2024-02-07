import { StyleSheet } from 'react-native';

import { Theme } from './types';

export default function makeThemedStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(themedStylesMaker: (theme: Theme) => T) {
  return themedStylesMaker;
}

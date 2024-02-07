import { StyleSheet } from 'react-native';

import { Theme } from './types';

export default function createThemedStyle<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(themedStyleCreator: (theme: Theme) => T) {
  return themedStyleCreator;
}

import { useHeaderHeight as useRNHeaderHeight } from '@react-navigation/elements';
import { Platform } from 'react-native';

export const IOS_SEARCH_BAR_HEIGHT = 56;

export function useHeaderHeight() {
  const headerHeight = useRNHeaderHeight();
  if (Platform.OS === 'ios') {
    return headerHeight + IOS_SEARCH_BAR_HEIGHT;
  }
  return headerHeight;
}

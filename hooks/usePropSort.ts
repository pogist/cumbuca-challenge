import { isEmpty } from '@util';

export function usePropSort<T extends object>(
  list: T[],
  order: 'asc' | 'desc',
  prop?: keyof T,
): T[] {
  if (prop && !isEmpty(prop)) {
    const sorted = [...list];
    sorted.sort((lhs, rhs) => {
      const lhsValue = lhs[prop];
      const rhsValue = rhs[prop];
      if (typeof lhsValue === 'number' && typeof rhsValue === 'number') {
        return order === 'asc' ? lhsValue - rhsValue : rhsValue - lhsValue;
      }
      if (typeof lhsValue === 'string' && typeof rhsValue === 'string') {
        const lhsUpper = lhsValue.toUpperCase();
        const rhsUpper = rhsValue.toUpperCase();
        if (lhsUpper < rhsUpper) {
          return -1;
        }
        if (lhsUpper > rhsUpper) {
          return 1;
        }
      }
      return 0;
    });
    return sorted;
  }
  return list;
}

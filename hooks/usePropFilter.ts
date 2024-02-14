import { isEmpty } from '@util';

export function usePropFilter<T extends object>(
  list: T[],
  prop: keyof T,
  term?: string,
): T[] {
  if (term && !isEmpty(term)) {
    return list.filter((item) => {
      const value = item[prop];
      if (typeof value === 'string') {
        return new RegExp(term, 'gi').test(value);
      }
      return true;
    });
  }
  return list;
}

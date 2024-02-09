export function diff<T extends object>(lhs: T, rhs: T): (keyof T)[] {
  const changed: (keyof T)[] = [];
  for (const key of Object.keys(lhs)) {
    const lhsValue = lhs[key as keyof T];
    const rhsValue = rhs[key as keyof T];
    if (lhsValue !== rhsValue) {
      changed.push(key as keyof T);
    }
  }
  return changed;
}

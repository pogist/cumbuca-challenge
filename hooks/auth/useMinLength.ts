export function useMinLength(value: string, length: number): [boolean, string] {
  const isValid = value.length >= length;
  const errorMessage = !isValid ? `Mínimo de ${length} dígitos` : '';
  return [isValid, errorMessage];
}

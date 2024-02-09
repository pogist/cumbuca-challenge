export function useEqualPasswords(
  password: string,
  repeatedPassword: string,
): [boolean, string] {
  const isEqual = password === repeatedPassword;
  const errorMessage = !isEqual ? 'Senhas diferentes' : '';
  return [isEqual, errorMessage];
}

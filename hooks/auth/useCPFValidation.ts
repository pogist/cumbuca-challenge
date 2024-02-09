const invalidCPF = 'CPF inválido';

export function useCPFValidation(cpfText: string): [boolean, string] {
  if (cpfText.length < 11) {
    return [false, invalidCPF];
  }
  return [true, ''];
}

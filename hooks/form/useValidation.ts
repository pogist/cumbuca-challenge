export interface ValidationSpec {
  validate: (text: string) => boolean;
  errorMessage: string;
}

export function useValidation(
  text: string | undefined,
  validation: ValidationSpec,
): [boolean, string] {
  const isValid = validation.validate(text ?? '');
  const errorMessage = !isValid ? validation.errorMessage : '';
  return [isValid, errorMessage];
}

export interface ValidationSpec {
  errorMessage: string;
  validate: (text: string) => boolean;
}

export function useValidation(
  value: string | undefined,
  validations: ValidationSpec[],
): [boolean, string] {
  for (const validation of validations) {
    const isValid = validation.validate(value ?? '');
    if (!isValid) {
      return [isValid, validation.errorMessage];
    }
  }
  return [true, ''];
}

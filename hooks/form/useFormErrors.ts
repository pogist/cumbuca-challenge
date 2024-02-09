import { Form, FormValidation, FormErrors } from './types';

export function useFormErrors<T extends Form>(
  validation: FormValidation<T>,
  errors: Partial<FormErrors<T>>,
): FormErrors<T> {
  const mappedErrors = {} as Record<keyof T, string>;
  for (const key of Object.keys(errors)) {
    const errorMessage = errors[key];
    if (errorMessage) {
      const isValid = validation[key];
      mappedErrors[key as keyof T] = !isValid ? errorMessage : '';
    }
  }
  return mappedErrors;
}

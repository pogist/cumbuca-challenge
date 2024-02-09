import { Form, FormValidation, FormErrors } from './types';

export function useFormErrors<T extends Form>(
  validation: FormValidation<T>,
  errors: FormErrors<T>,
): FormErrors<T> {
  const mappedErrors = {} as Record<keyof T, string>;
  for (const key of Object.keys(errors)) {
    const isValid = validation[key];
    mappedErrors[key as keyof T] = !isValid ? errors[key] : '';
  }
  return mappedErrors;
}

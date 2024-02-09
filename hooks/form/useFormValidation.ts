import { diff } from '@util';

import { usePrevious } from '../usePrevious';

interface Form {
  [field: string]: string;
}

type Validations<T extends Form> = {
  [K in keyof T]: (text: string) => boolean;
};

type ValidationResult<T extends Form> = {
  [K in keyof T]: boolean;
};

let validationCache: ValidationResult<any> = {};

export function useFormValidation<T extends Form>(
  form: T,
  validations: Validations<T>,
): ValidationResult<T> {
  const prevForm = usePrevious(form);
  const changedFields = diff(prevForm, form);
  const validation = { ...validationCache } as Record<keyof T, boolean>;
  for (const field of changedFields) {
    const text = form[field];
    const validate = validations[field];
    validation[field] = validate(text);
  }
  validationCache = validation;
  return validation;
}

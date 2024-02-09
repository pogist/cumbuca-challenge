import { diff } from '@util';

import { Form, FormValidation } from './types';
import { usePrevious } from '../usePrevious';

type Validations<T extends Form> = {
  [K in keyof T]: (text: string) => boolean;
};

let validationCache: FormValidation<any> = {};

export function useFormValidation<T extends Form>(
  form: T,
  validations: Validations<T>,
): FormValidation<T> {
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

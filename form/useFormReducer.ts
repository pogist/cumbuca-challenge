import { isEmpty } from '@util';
import React from 'react';

import { Fields, FieldState, FormState, FormAction, Rule } from './types';

export function useFormReducer<T extends Fields>(fields: T) {
  return React.useReducer(reducer<T>, fields, initState);
}

function reducer<T extends Fields>(
  state: FormState<T>,
  action: FormAction<T>,
): FormState<T> {
  const fieldState = state[action.field];
  if (fieldState.value !== action.value) {
    const error = applyRules(action.value, fieldState.rules);
    const newFieldState = {
      ...fieldState,
      value: action.value,
      isValid: isEmpty(error),
      error,
    };
    return { ...state, [action.field]: newFieldState };
  }
  return state;
}

function initState<T extends Fields>(fields: T): FormState<T> {
  const state = {} as Record<keyof T, FieldState>;
  for (const key of Object.keys(fields)) {
    const field = fields[key];
    const error = applyRules(field.value, field.rules);
    const fieldState: FieldState = {
      ...field,
      error,
      isValid: isEmpty(error),
    };
    state[key as keyof T] = fieldState;
  }
  return state;
}

function applyRules(value: string, rules: Rule[]): string {
  const brokenRule = rules.find((rule) => !rule.validate(value));
  return brokenRule ? brokenRule.errorMessage : '';
}

import { expect as jestExpect } from '@jest/globals';
import { Product } from '@types';

import { useValidation } from '../useValidation';

describe('useValidation', () => {
  it('should apply a series of validations and return the first error', () => {
    const isNotEmpty = {
      validate: (value: string) => value.length > 0,
      errorMessage: 'Value is empty',
    };

    const isGreaterThan8 = {
      validate: (value: string) => value.length > 8,
      errorMessage: 'Value is less than 8',
    };

    const [isValidA, errorMessageA] = useValidation('', [
      isGreaterThan8,
      isNotEmpty,
    ]);
    const [isValidB, errorMessageB] = useValidation('', [
      isNotEmpty,
      isGreaterThan8,
    ]);
    const [isValidC, errorMessageC] = useValidation('small', [
      isNotEmpty,
      isGreaterThan8,
    ]);
    const [isValidD, errorMessageD] = useValidation('valid value', [
      isNotEmpty,
      isGreaterThan8,
    ]);

    jestExpect(isValidA).toBe(false);
    jestExpect(errorMessageA).toEqual('Value is less than 8');
    jestExpect(isValidB).toBe(false);
    jestExpect(errorMessageB).toEqual('Value is empty');
    jestExpect(isValidC).toBe(false);
    jestExpect(errorMessageC).toEqual('Value is less than 8');
    jestExpect(isValidD).toBe(true);
    jestExpect(errorMessageD).toEqual('');
  });
});

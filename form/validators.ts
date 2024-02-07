import { Validator } from './types';

export const minLength: Validator<number> = (value) => (text) => {
  return text.length >= value;
};

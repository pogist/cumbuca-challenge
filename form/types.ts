export type Validate = (text: string) => boolean;
export type Validator<T> = (value: T) => Validate;

export type Rule = {
  validate: Validate;
  errorMessage: string;
};

export type Fields = {
  [name: string]: {
    value: string;
    rules: Rule[];
  };
};

export type FieldState = {
  value: string;
  error: string;
  rules: Rule[];
  isValid: boolean;
};

export type FormState<T extends Fields> = {
  [field in keyof T]: FieldState;
};

export type FormAction<T extends Fields> = {
  field: keyof T;
  value: string;
};

export interface Form {
  [field: string]: string;
}

export type FormValidation<T extends Form> = {
  [K in keyof T]: boolean;
};

type ErrorMessage = string;
export type FormErrors<T extends Form> = {
  [K in keyof T]: ErrorMessage;
};

import { useForm, useFormErrors, useFormValidation } from '../form';

interface AuthForm {
  cpf: {
    value: string;
    error: string;
    isValid: boolean;
    onChangeText: (text: string) => void;
  };
  password: {
    value: string;
    error: string;
    isValid: boolean;
    onChangeText: (text: string) => void;
  };
  disabled: boolean;
}

export function useAuthForm(): AuthForm {
  const [form, onChangeText] = useForm({
    cpf: '',
    password: '',
  });

  const valid = useFormValidation(form, {
    cpf: (text: string) => {
      // TODO: Add complete CPF verification
      return !(text.length < 11);
    },
    password: (text: string) => {
      return text.length >= 8;
    },
  });

  const errors = useFormErrors(valid, {
    cpf: 'CPF inválido',
    password: 'Mínimo de 8 dígitos',
  });

  return {
    cpf: {
      value: form.cpf,
      error: errors.cpf,
      isValid: valid.cpf,
      onChangeText: onChangeText('cpf'),
    },
    password: {
      value: form.password,
      error: errors.password,
      isValid: valid.password,
      onChangeText: onChangeText('password'),
    },
    disabled: !valid.cpf || !valid.password,
  };
}

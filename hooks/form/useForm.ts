import React from 'react';

interface State {
  [field: string]: string;
}

interface Action<T extends State> {
  type: keyof T;
  value: string;
}

type Update<T> = (field: keyof T) => (value: string) => void;

export function useForm<T extends State>(initialState: T): [T, Update<T>] {
  const [state, dispatch] = React.useReducer(reducer<T>, initialState);
  function update(field: keyof T) {
    return (value: string) => {
      dispatch({ value, type: field });
    };
  }
  return [state, update];
}

function reducer<T extends State>(state: T, action: Action<T>): T {
  return { ...state, [action.type]: action.value };
}

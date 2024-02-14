import React from 'react';

export function useNumberFormat(value: number): string {
  const formatter = React.useRef(
    new Intl.NumberFormat('pt-BR', {
      useGrouping: false,
      minimumIntegerDigits: 2,
    }),
  ).current;
  return formatter.format(value);
}

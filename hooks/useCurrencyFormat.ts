import React from 'react';

export function useCurrencyFormat(value: number): string {
  const formatter = React.useRef(
    Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }),
  ).current;
  return formatter.format(value);
}

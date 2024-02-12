const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function useCurrencyFormat(value: number): string {
  return currencyFormatter.format(value);
}

const numberFormatter = new Intl.NumberFormat('pt-BR', {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

export function useNumberFormat(value: number): string {
  return numberFormatter.format(value);
}

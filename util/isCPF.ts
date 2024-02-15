const CPF_LENGTH = 11;

export function isCPF(text: string): boolean {
  const cpf = text.replaceAll(/\D/g, '');
  if (cpf.length !== CPF_LENGTH) {
    return false;
  }

  const digits = cpf.split('').map((digit) => +digit);

  const d1 = makeDigit(10, digits.slice(0, 9));
  if (d1 !== digits[CPF_LENGTH - 2]) {
    return false;
  }

  const d2 = makeDigit(11, [...digits.slice(0, 9), d1]);
  if (d2 !== digits[CPF_LENGTH - 1]) {
    return false;
  }

  return true;
}

function makeDigit(initialMult: number, digits: number[]): number {
  let sum = 0;
  let idx = 0;
  let mult = initialMult;
  while (mult >= 2) {
    sum += digits[idx] * mult;
    idx++;
    mult--;
  }
  let rem = (sum * 10) % 11;
  if (rem === 10) {
    rem = 0;
  }
  return rem;
}

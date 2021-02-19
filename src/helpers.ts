export const randomNumber = (from: number, to: number): number =>
  Math.floor(Math.random() * (to - from + 1) + from);

export const randomId = (): string => randomNumber(100000, 999999).toString();

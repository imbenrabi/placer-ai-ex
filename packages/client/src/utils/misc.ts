const regExp = /^\d+$/;

export function isNumber(input: string): boolean {
  return regExp.test(input);
}

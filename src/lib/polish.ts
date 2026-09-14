export function plural(
  count: number,
  one: string,
  few: string,
  many: string,
): string {
  const abs = Math.abs(count);
  const lastDigit = abs % 10;
  const lastTwo = abs % 100;

  if (abs === 1) return one;

  if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) {
    return few;
  }
  return many;
}

export function seats(count: number): string {
  return `${count} ${plural(count, "miejsce", "miejsca", "miejsc")}`;
}

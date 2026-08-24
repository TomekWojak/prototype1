/**
 * Odmiana liczebników po polsku.
 *
 * Polski ma trzy formy zamiast angielskich dwóch, a wybór zależy od dwóch
 * ostatnich cyfr — nie od samej liczby. Dlatego proste doklejanie sufiksu
 * („{n} miejsc”) daje „24 miejsc” zamiast „24 miejsca”. To jedyne miejsce
 * w projekcie, które o tym wie.
 */
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
  // 12–14 to wyjątek: „dwanaście miejsc”, nie „dwanaście miejsca”.
  if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) {
    return few;
  }
  return many;
}

/** „1 miejsce”, „2 miejsca”, „5 miejsc”, „24 miejsca”, „12 miejsc”. */
export function seats(count: number): string {
  return `${count} ${plural(count, "miejsce", "miejsca", "miejsc")}`;
}

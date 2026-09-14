const MONTH_PREFIXES = [
  "stycz",
  "lut",
  "mar",
  "kwie",
  "maj",
  "czerw",
  "lip",
  "sierp",
  "wrze",
  "paź",
  "listopad",
  "grud",
] as const;

export function toIsoDate(input: string): string {
  const text = input.toLowerCase();

  const numbers = text.match(/\d{1,4}/g) ?? [];
  const yearIndex = numbers.findIndex((n) => n.length === 4);
  if (yearIndex < 0) return "";

  const year = Number(numbers[yearIndex]);

  const namedMonth = MONTH_PREFIXES.findIndex((prefix) =>
    text.includes(prefix),
  );

  let day: number;
  let month: number;

  if (namedMonth >= 0) {
    month = namedMonth + 1;

    const withoutYear = numbers.filter((_, i) => i !== yearIndex);
    day = Number(withoutYear[0]);
  } else if (yearIndex === 0) {
    day = Number(numbers[2]);
    month = Number(numbers[1]);
  } else {
    day = Number(numbers[0]);
    month = Number(numbers[yearIndex - 1]);
  }

  if (!inRange(day, 1, 31) || !inRange(month, 1, 12)) return "";
  if (!inRange(year, 1900, 2999)) return "";

  return `${year}-${twoDigits(month)}-${twoDigits(day)}`;
}

function inRange(value: number, min: number, max: number): boolean {
  return Number.isInteger(value) && value >= min && value <= max;
}

function twoDigits(value: number): string {
  return String(value).padStart(2, "0");
}

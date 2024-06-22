import { COUNTRIES } from "@/constants";

export const normalizePhone = (value?: string) => {
  if (!value) return undefined;

  value = value.replace(/[\s+\-()]/g, "");

  const tests = Object.values(COUNTRIES)
    .slice(-1)
    .map((country) => country.test);

  if (
    !value.startsWith("+") &&
    tests.some((regexp) => value && regexp.test(value))
  ) {
    value = `+${value}`;
  }

  return value;
};

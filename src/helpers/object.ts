import { isEmpty } from "lodash-es";

export const compactObject = <O extends Record<string, unknown>>(
  object: O
): Partial<O> => {
  return Object.keys(object).reduce((acc, cur) => {
    const key = cur as keyof typeof object;
    const value = object[key];

    if (typeof object[key] === "boolean") {
      acc[key] = value;
    } else if (typeof object[key] === "number" && value) {
      acc[key] = value;
    } else if (!isEmpty(value)) {
      acc[key] = value;
    }

    return acc;
  }, {} as O);
};

export const isObject = (value: unknown) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

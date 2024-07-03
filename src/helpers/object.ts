import { isDate } from "date-fns";
import { isEmpty, transform } from "lodash-es";
import { unref } from "vue";

import type { ComputedRef, MaybeRef } from "vue";

import { isFile } from "@/helpers/getters";

type DeepUnref<
  V,
  T = V extends MaybeRef<infer R> | ComputedRef<infer R> ? R : V
> = T extends Array<infer E>
  ? Array<DeepUnref<E>>
  : T extends (...args: any[]) => any
  ? T
  : T extends Record<string, any>
  ? { [Key in keyof T]: DeepUnref<T[Key]> }
  : T;

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

export const deepUnref = <T>(value: T): DeepUnref<T> => {
  const $value = unref(value);

  if (Array.isArray($value))
    return $value.map((item) => deepUnref(item)) as any;

  if (
    typeof $value === "object" &&
    $value !== null &&
    !isFile($value) &&
    !isDate($value)
  )
    return transform($value, (value) => deepUnref(value)) as any;

  return $value as any;
};

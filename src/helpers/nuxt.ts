import { isDate } from "date-fns";
import { transform } from "lodash-es";
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

import { ref, shallowReadonly, unref } from "vue";

import type { Ref, UnwrapRef } from "vue";

type Args<T> = T | undefined;

export const useRef = <T>(
  initialState?: Args<T>
): [Readonly<Ref<Args<T>>>, (value?: Args<T>) => void] => {
  const state = ref(initialState);

  const setState = (value?: Args<T>) =>
    (state.value = unref(value) as UnwrapRef<Args<T>>);

  return [shallowReadonly(state) as Ref<T>, setState];
};

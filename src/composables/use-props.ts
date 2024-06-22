import { toRef } from "vue";

import type { Ref } from "vue";

type ReadonlyObject = Record<Readonly<string>, unknown>;

type RefObject<P extends ReadonlyObject> = {
  [key in keyof P]-?: Ref<P[key]>;
};

export const useProps = <P extends ReadonlyObject>(props: P): RefObject<P> =>
  Object.keys(props).reduce<RefObject<P>>((acc, curr) => {
    acc[curr as keyof P] = toRef(props, curr);
    return acc;
  }, {} as RefObject<P>);

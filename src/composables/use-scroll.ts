import { onBeforeUnmount, onMounted } from "vue";

import { useRef } from "@/composables/use-ref";

export const useScroll = (
  selector: string,
  handlers: { onBottom?: () => void; onScroll?: (position: number) => void },
  options?: { bottomIndent?: number }
) => {
  const { bottomIndent } = options ?? {};

  const [nodeElement, setNodeElement] = useRef<Element>();
  const [scrollEnd, setScrollEnd] = useRef<boolean>();

  const getHasScrollbar = () => {
    const { clientHeight = 0, scrollHeight = 0 } = nodeElement.value ?? {};
    return scrollHeight > clientHeight;
  };

  const off = () => nodeElement.value?.removeEventListener("scroll", onScroll);

  const onScroll = ({ target }: Event) => {
    const { scrollTop, clientHeight, scrollHeight } = target as Element;

    if (scrollTop + clientHeight + (bottomIndent ?? 0) >= scrollHeight) {
      if (scrollEnd.value) return;

      handlers.onBottom?.();
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }

    handlers.onScroll?.(scrollTop);
  };

  onMounted(() => {
    const node = document.querySelector(selector);
    node && setNodeElement(node);
    nodeElement.value?.addEventListener("scroll", onScroll);
  });

  onBeforeUnmount(() => off());

  return { getHasScrollbar, off };
};

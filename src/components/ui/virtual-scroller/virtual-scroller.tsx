import {
  cloneVNode,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

import type { PropType } from "vue";

import { useProps } from "@/composables";

type VSNode = ((data: any, index: number) => VNode) | VNode;

export const VirtualScroller = defineComponent({
  name: "VirtualScroller",

  props: {
    data: Array as PropType<any[] | Readonly<any[]>>,

    dataKey: { type: String, default: "id" },

    height: { type: Number as PropType<number>, required: true },

    nodeContent: {
      type: [Function, Object] as PropType<VSNode>,
      required: true,
    },

    nodeElement: {
      type: [Function, Object] as PropType<VSNode>,
      required: true,
    },

    root: { type: Object as PropType<Element>, required: true },

    rootMargin: String,
  },

  setup(props) {
    const { data, root, rootMargin } = useProps(props);

    const visibleIndices = ref<number[]>([]);
    const cacheHeights = ref<Record<string, number>>({});

    const callback: IntersectionObserverCallback = (entries) => {
      const addedIndices: number[] = [];
      const removedIndices: number[] = [];

      entries.forEach((entry) => {
        const { isIntersecting, target } = entry;
        const $target = target as HTMLDivElement;

        const { vsIndex: index, vsId: id } = $target.dataset;
        const isEmpty = "vsEmpty" in $target.dataset;

        if (isIntersecting && isEmpty) addedIndices.push(Number(index));
        if (!isIntersecting && !isEmpty) removedIndices.push(Number(index));

        const offsetHeight = $target.offsetHeight;

        if (
          id &&
          offsetHeight !== props.height &&
          offsetHeight !== cacheHeights.value[id]
        ) {
          cacheHeights.value[id] = offsetHeight;
        }
      });

      visibleIndices.value = [
        ...visibleIndices.value.filter(
          (index) => !removedIndices.includes(index)
        ),
        ...addedIndices,
      ];
    };

    const options = {
      root: root.value,
      rootMargin: rootMargin.value || "300px 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(callback, options);

    const getSelectors = () => root.value?.querySelectorAll("[data-vs-index]");

    onMounted(() => {
      const elements = getSelectors();
      elements?.forEach((element) => observer.observe(element));
    });

    onBeforeUnmount(() => {
      observer.disconnect();
    });

    watch(data, (next) => {
      if (!next) return;
      observer.disconnect();
      nextTick(() => {
        const elements = getSelectors();
        elements?.forEach((element) => observer.observe(element));
      });
    });

    const getContent = (data: any, index: number) => {
      return typeof props.nodeContent === "function"
        ? props.nodeContent(data, index)
        : props.nodeContent;
    };

    const getNode = (data: any, index: number) => {
      return typeof props.nodeElement === "function"
        ? props.nodeElement(data, index)
        : props.nodeElement;
    };

    return { cacheHeights, getContent, getNode, visibleIndices };
  },

  methods: {
    renderEmptyNode(data, index) {
      const { dataKey, cacheHeights, getNode, height } = this;
      const node = getNode(data, index);

      return h(
        cloneVNode(node, {
          ["data-vs-index"]: index,
          ["data-vs-empty"]: true,
          ["data-vs-id"]: data[dataKey],
          key: index,
          style: { height: `${cacheHeights[data[dataKey]] || height}px` },
        }),
        undefined
      );
    },

    renderDataNode(data, index) {
      const { dataKey, getContent, getNode } = this;

      const node = getNode(data, index);
      const content = getContent(data, index);

      return h(
        cloneVNode(node, {
          ["data-vs-index"]: index,
          ["data-vs-id"]: data[dataKey],
          key: index,
        }),
        content
      );
    },
  },

  render() {
    const { data, visibleIndices } = this;

    if (!data?.length) return undefined;

    return (
      <>
        {data.map((data, index) =>
          !visibleIndices.includes(index)
            ? this.renderEmptyNode(data, index)
            : this.renderDataNode(data, index)
        )}
      </>
    );
  },
});

import { computed, defineAsyncComponent, defineComponent } from "vue";

import type { Icon } from "@/components/ui/types";
import type { PropType } from "vue";

import "./base-icon.scss";

export const BaseIcon = defineComponent({
  name: "BaseIcon",
  props: {
    name: { type: String as PropType<Icon>, required: true },
    prefix: { type: String, default: "icon" },
    size: { type: Number, default: 16 },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);

    const icon = defineAsyncComponent(
      () => import(`@/assets/icons/${props.name}.svg`)
    );

    return { symbolId, icon };
  },
  render() {
    const { size, icon } = this;
    const Icon = icon;

    return (
      <Icon
        aria-hidden="true"
        class="base-icon_gray"
        height={`${size}px`}
        width={`${size}px`}
      />
    );
  },
});

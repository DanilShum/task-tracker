import { computed, defineComponent } from "vue";

import type { Color, Size } from "@/components/ui/types";
import type { PropType } from "vue";

import { BaseButton } from "@/components";
import { COLORS, SIZE } from "@/components/ui/constants";
import { useProps } from "@/composables";

type Id = string | number;

type Button = {
  active?: boolean | string | number;
  id: Id;
  label: string;
};

export const ButtonSwitcher = defineComponent({
  name: "ButtonSwitcher",
  props: {
    active: { type: [String, Number], default: 0 },
    activeIds: { type: Array as PropType<Id[]>, default: () => [] },
    color: { type: String as PropType<Color>, default: COLORS.gray },
    items: { type: Array as PropType<Button[]>, required: true },
    size: { type: String as PropType<Size>, default: SIZE.default },
    whenClick: { type: Function as PropType<(button: Button) => void> },
  },
  setup(props) {
    const { active, activeIds, items, whenClick } = useProps(props);

    const buttons = computed(() =>
      items.value.map((item) => {
        return {
          ...item,
          active:
            activeIds.value?.includes(item.id) ||
            active.value === item.id ||
            item.active,
        };
      })
    );

    const handleClick = (button: Button) => whenClick.value?.(button);

    return { buttons, handleClick };
  },

  render() {
    const { $t, buttons, color, handleClick, size } = this;

    return (
      <div class="space-x-1 rounded-4 bg-gray-200/30 p-1">
        {buttons.map((button, i) => (
          <BaseButton
            key={i}
            color={color}
            size={size}
            text={button.label ? $t(button.label) : ""}
            variant={button.active ? "primary" : "secondary"}
            whenClick={() => handleClick(button)}
          />
        ))}
      </div>
    );
  },
});

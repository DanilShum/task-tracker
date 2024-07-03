import { defineComponent } from "vue";

import type { Color, Icon, Size, Variant } from "@/components/ui/types";
import type { PropType } from "vue";

import { BaseButton } from "@/components";
import { COLORS, SIZE, VARIANTS } from "@/components/ui/constants";
import { useProps } from "@/composables";

type Button = {
  text?: string;
  icon?: Icon;
  eventName?: string;
};

export const BaseButtons = defineComponent({
  name: "BaseButtons",
  props: {
    buttons: { type: Array as PropType<Button[]>, required: true },
    color: { type: String as PropType<Color>, default: COLORS.gray },
    size: { type: String as PropType<Size>, default: SIZE.default },
    variant: { type: String as PropType<Variant>, default: VARIANTS.primary },
    whenClick: { type: Function as PropType<(button: Button) => void> },
  },
  setup(props) {
    const { whenClick } = useProps(props);

    const handleClick = (button: Button) => whenClick.value?.(button);

    return { handleClick };
  },
  render() {
    const { buttons, variant, color, size, handleClick } = this;
    return (
      <div class="flex items-center">
        {buttons.map((button, i) => (
          <BaseButton
            key={i}
            class="relative before:absolute before:right-0 before:block before:h-1/2 before:w-one before:bg-gray-400 first:rounded-r-none last:rounded-l-none last:before:content-none"
            color={color}
            size={size}
            text={button.text ?? ""}
            variant={variant}
            whenClick={() => handleClick(button)}
          />
        ))}
      </div>
    );
  },
});

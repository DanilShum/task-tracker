import { computed, defineComponent } from "vue";
import { RouterLink } from "vue-router";

import "./base-button.scss";

import type {
  Color,
  Size,
  Type,
  Variant,
} from "@/components/ui/buttons/constants";
import type { PropType } from "vue";

import {
  BUTTON_TYPES,
  COLORS,
  SIZE,
  VARIANTS,
} from "@/components/ui/buttons/constants";
import { useProps } from "@/composables";

export const BaseButton = defineComponent({
  name: "BaseButton",
  props: {
    block: { type: Boolean as PropType<boolean>, default: false },
    color: { type: String as PropType<Color>, default: COLORS.gray },
    disabled: { type: Boolean as PropType<boolean>, default: false },
    size: { type: String as PropType<Size>, default: SIZE.default },
    text: { type: [String, Number] as PropType<string | number>, default: "" },
    to: { type: [String, Object] as PropType<any>, default: "" },
    type: { type: String as PropType<Type>, default: BUTTON_TYPES.button },
    variant: { type: String as PropType<Variant>, default: VARIANTS.primary },
    whenClick: { type: Function as PropType<() => void> },
    withIcon: { type: Boolean as PropType<boolean>, default: false },
  },

  setup(props) {
    const { block, color, disabled, variant, size, withIcon } = useProps(props);

    const classes = computed(() => {
      const iconClass = `base-button_icon rounded-full ${
        size.value === "small"
          ? "w-8 min-w-8"
          : size.value === "large"
          ? "w-12 min-w-12"
          : "w-10 min-w-10"
      }`;
      return {
        "base-button_disabled": disabled.value,
        "base-button_flat": variant.value === "flat",
        "base-button_primary": variant.value === "primary",
        "base-button_secondary": variant.value === "secondary",
        "flex w-full": block.value,
        "h-12 text-sm font-bold": size.value === "large",
        "h-8": size.value === "small",
        [iconClass]: withIcon.value,
        [`base-button_${color.value}`]: true,
      };
    });

    return { classes };
  },

  render() {
    const { text, to, disabled, type, whenClick, classes } = this;

    const RenderContent = (
      <>
        {this.$slots.right && this.$slots.left?.()}

        <span>
          {this.$slots.default
            ? this.$slots.default()
            : text
            ? text
            : undefined}
        </span>

        {this.$slots.right && this.$slots.right?.()}
      </>
    );

    if (to) return <RouterLink to={to}>{RenderContent}</RouterLink>;

    return (
      <button
        class={[
          classes,
          "base-button relative box-border inline-flex h-10 max-w-full cursor-pointer select-none items-center justify-center rounded-4 border-0 text-center align-top text-sm leading-4 no-underline outline-0",
        ]}
        disabled={disabled}
        type={type}
        onClick={whenClick}
      >
        {RenderContent}
      </button>
    );
  },
});

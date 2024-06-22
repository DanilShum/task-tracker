import { computed, defineComponent } from "vue";
import { RouterLink } from "vue-router";

import css from "./base-button.module.scss";

import type { PropType } from "vue";

import { useProps } from "@/composables";

const BUTTON_TYPES = {
  button: "button",
  submit: "submit",
};

export const COLORS = {
  gray: "gray",
  blue: "blue",
  teal: "teal",
  red: "red",
};

const BUTTON_KEYS = Object.keys(BUTTON_TYPES);
export const COLOR_KEYS = Object.keys(COLORS);
type Type = keyof typeof BUTTON_TYPES;
export type Color = keyof typeof COLORS;

export default defineComponent({
  name: "BaseButton",
  props: {
    block: { type: Boolean as PropType<boolean>, default: false },

    color: {
      type: String as PropType<Color>,
      default: COLORS.gray,
      validator: (value: Color) => COLOR_KEYS.includes(value),
    },

    disabled: { type: Boolean as PropType<boolean>, default: false },
    flat: { type: Boolean as PropType<boolean>, default: false },
    large: { type: Boolean as PropType<boolean>, default: false },
    primary: { type: Boolean as PropType<boolean>, default: false },
    secondary: { type: Boolean as PropType<boolean>, default: false },
    small: { type: Boolean as PropType<boolean>, default: false },
    text: { type: [String, Number] as PropType<string | number>, default: "" },
    to: { type: [String, Object] as PropType<any>, default: "" },

    type: {
      type: String as PropType<Type>,
      default: BUTTON_TYPES.button,
      validator: (value: Type) => BUTTON_KEYS.includes(value),
    },

    withIcon: { type: Boolean as PropType<boolean>, default: false },

    whenClick: { type: Function as PropType<() => void> },
  },

  setup(props) {
    const {
      block,
      color,
      disabled,
      flat,
      large,
      primary,
      secondary,
      small,
      withIcon,
    } = useProps(props);

    const classes = computed(() => {
      const iconClass = `base-button_icon rounded-full ${
        small.value
          ? "w-8 min-w-8"
          : large.value
          ? "w-12 min-w-12"
          : "w-10 min-w-10"
      }`;
      return {
        "base-button_disabled": disabled.value,
        "h-8": small.value,
        "h-12 text-sm font-bold": large.value,
        "flex w-full": block.value,
        [iconClass]: withIcon.value,
        "base-button_primary": primary.value,
        "base-button_secondary": secondary.value,
        "base-button_flat": flat.value,
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
        class={css.baseButton}
        disabled={disabled}
        type={type}
        onClick={whenClick}
      >
        {RenderContent}
      </button>
    );
  },
});

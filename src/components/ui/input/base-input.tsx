import { computed, defineComponent, ref } from "vue";

import type { Size } from "@/components/ui/types";
import type { InputType } from "@/components/ui/types";
import type { PropType } from "vue";

import { SIZE } from "@/components/ui/constants";
import { INPUT_TYPES } from "@/components/ui/input/constants";
import { useProps } from "@/composables";

import "./base-input.scss";

export const BaseInput = defineComponent({
  name: "BaseInput",
  props: {
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    hasError: { type: Boolean, default: false },
    label: { type: String, default: "" },
    max: { type: [String, Number], default: "" },
    min: { type: [String, Number], default: "" },
    readonly: { type: Boolean, default: false },
    size: { type: String as PropType<Size>, default: SIZE.default },
    type: { type: String as PropType<InputType>, default: "text" },
    uppercase: { type: Boolean, default: false },
    value: { type: [String, Number], default: "" },
    whenBlur: { type: Function as PropType<() => void> },
    whenChange: { type: Function as PropType<(value: string) => void> },
    whenInput: { type: Function as PropType<(value: string) => void> },
  },
  setup(props) {
    const { value, type, size, hasError, whenInput, whenBlur, whenChange } =
      useProps(props);

    const inputRef = ref<HTMLInputElement>();

    const hasValue = computed(() => value.value !== "");
    const isTime = computed(() => type.value === INPUT_TYPES.time);

    const classes = computed(() => ({
      "!border-red-600": hasError.value,
      "focus-within:border-teal-600": !hasError.value,
      "h-12": size.value === SIZE.default,
      "h-14": size.value === SIZE.large,
      "h-8": size.value === SIZE.small,
    }));

    const handleBlur = (): void => whenBlur.value?.();
    const handleChange = (value: string): void => whenChange.value?.(value);
    const handleInput = (value: string): void => whenInput.value?.(value);
    const handleSelect = () => inputRef.value?.focus();

    return {
      classes,
      handleBlur,
      handleChange,
      handleInput,
      handleSelect,
      hasValue,
      inputRef,
      isTime,
    };
  },

  render() {
    const {
      $attrs,
      autofocus,
      classes,
      disabled,
      handleBlur,
      handleChange,
      handleInput,
      hasValue,
      isTime,
      label,
      max,
      min,
      readonly,
      type,
      uppercase,
      value,
    } = this;

    // @ts-ignore
    return (
      <div
        class={[
          "base-input",
          { "base-input_has-value": hasValue, "base-input_time": isTime },
        ]}
      >
        <fieldset
          class={[
            classes,
            "base-input__fieldset relative m-0 box-border flex w-full appearance-none items-center rounded border border-solid border-transparent p-0",
          ]}
        >
          {label && (
            <legend
              class={[{ uppercase: uppercase }, "ml-2 h-0 px-1 opacity-0"]}
            >
              {label}
            </legend>
          )}

          <label class="relative box-border flex h-full w-full min-w-0 cursor-text">
            {label && (
              <span
                class={[
                  { uppercase: uppercase },
                  "base-input__label-text z-1 pointer-events-none absolute right-0 bottom-0 h-full max-w-full select-none truncate rounded font-medium",
                ]}
              >
                {label}
              </span>
            )}

            {this.$slots.input ? (
              this.$slots.input()
            ) : (
              <input
                {...$attrs}
                ref="inputRef"
                autofocus={autofocus}
                class="base-input__field rounded"
                disabled={disabled}
                max={max}
                min={min}
                readonly={readonly}
                type={type}
                value={value}
                onBlur={handleBlur}
                onChange={(event) => handleChange(event.target?.value)}
                onInput={(event) => handleInput(event.target?.value)}
              />
            )}

            <div class="base-input__value flex rounded">
              {this.$slots.value ? this.$slots.value() : <div>{value}</div>}
            </div>
          </label>
        </fieldset>

        {this.$slots.bottom && this.$slots.bottom?.()}
      </div>
    );
  },
});

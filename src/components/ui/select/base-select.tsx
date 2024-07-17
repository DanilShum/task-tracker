import { keyBy, xor } from "lodash-es";
import { computed, defineComponent, ref } from "vue";
import { Tippy } from "vue-tippy";

import type { SelectOption, Size } from "@/components/ui/types";
import type { Color } from "@/components/ui/types";
import type { PropType } from "vue";

import { BaseInput, VirtualScroller } from "@/components";
import { COLORS, SIZE } from "@/components/ui/constants";
import { LIST_HEIGHT } from "@/components/ui/select/constants";
import { useProps, useRef } from "@/composables";
import { wrapIntoArray } from "@/helpers";

type SelectValue =
  | SelectOption["value"]
  | Array<SelectOption["value"]>
  | undefined;

export const BaseSelect = defineComponent({
  name: "BaseSelect",
  props: {
    checkbox: Boolean,
    clearable: Boolean,
    color: { type: String as PropType<Color>, default: COLORS.gray },
    disabled: Boolean,
    error: null,
    label: String,
    loading: Boolean,
    multi: Boolean,
    objectKey: String,
    options: { type: Array as PropType<SelectOption[]>, required: true },
    placeholder: String,
    size: { type: String as PropType<Size>, default: SIZE.default },
    value: [Array, String, Number] as PropType<SelectValue>,

    whenChange: {
      type: Function as PropType<
        (values: Array<SelectOption["value"]> | undefined) => void
      >,
      required: true,
    },
  },

  setup(props) {
    const { color, options, multi, value, whenChange } = useProps(props);
    const [dropdownWidth, setDropdownWidth] = useRef<number>(300);
    const [activeItemIndex, setActiveItemIndex] = useRef<number>(-1);

    const selectRef = ref<HTMLDivElement>();
    const inputRef = ref<typeof BaseInput>();

    const optionByValue = computed(() => keyBy(options.value, "value"));

    const selectedValue = computed(() =>
      value.value ? wrapIntoArray(value.value).map(String) : undefined
    );

    const selectedOptions = computed(() =>
      selectedValue.value?.map((value) => optionByValue.value[value])
    );

    const classes = computed(() => ({
      "divide-blue-600/50": color.value === "blue",
      "divide-gray-600/50": color.value === "gray",
      "divide-red-600/50": color.value === "red",
      "divide-teal-600/50": color.value === "teal",
    }));

    const handleFocusItem = (index: number) => {
      setActiveItemIndex(index);
    };

    const handleKeyup = (event: KeyboardEvent) => {
      event.preventDefault();

      if (event.key === "ArrowDown") {
        setActiveItemIndex(
          activeItemIndex.value !== undefined
            ? activeItemIndex.value < options.value.length - 1
              ? activeItemIndex.value + 1
              : activeItemIndex.value
            : 0
        );
      }

      if (event.key === "ArrowUp") {
        setActiveItemIndex(
          activeItemIndex.value !== undefined
            ? activeItemIndex.value !== 0
              ? activeItemIndex.value - 1
              : 0
            : activeItemIndex.value
        );
      }

      if (event.key === "Enter" && activeItemIndex.value !== undefined) {
        handleSelectItem(options.value[activeItemIndex.value].value);
      }

      scrollListToItem();
    };

    const handleSelectItem = (input: SelectOption["value"]) => {
      const values = wrapIntoArray(input).map(String);

      if (multi.value) whenChange.value(xor(values, selectedValue.value));

      if (!multi.value) whenChange.value(values);
    };

    const scrollListToItem = () => {
      const targetEl = selectRef.value?.querySelector(
        `[data-vs-index="${activeItemIndex.value}"]`
      );

      if (!targetEl || !selectRef.value) return;

      const itemHeight = targetEl.getBoundingClientRect().height;
      const listHeight = LIST_HEIGHT;

      const scrollTop = selectRef.value.scrollTop;
      const itemTop = (activeItemIndex.value ?? 1) * itemHeight;

      if (itemTop < scrollTop) {
        selectRef.value.scrollTop = itemTop;
      } else {
        const listBottom = scrollTop + listHeight;
        const itemBottom = itemTop + itemHeight;

        if (itemBottom > listBottom) {
          selectRef.value.scrollTop = itemBottom - listHeight;
        }
      }
    };

    const whenShowDropdown = () => {
      setDropdownWidth(inputRef.value?.$el?.clientWidth ?? 300);
    };

    return {
      activeItemIndex,
      classes,
      dropdownWidth,
      handleFocusItem,
      handleKeyup,
      handleSelectItem,
      inputRef,
      selectRef,
      selectedOptions,
      selectedValue,
      whenShowDropdown,
    };
  },

  methods: {
    renderDropdown() {
      const { classes, dropdownWidth, handleKeyup, options, selectRef } = this;

      return (
        <div
          ref="selectRef"
          class={[
            classes,
            "rounded shadow-lg bg-white divide-y max-h-40 overflow-auto",
          ]}
          style={{ width: `${dropdownWidth}px` }}
          tabindex="0"
          onKeydown={(e) => e.preventDefault()}
          onKeyup={handleKeyup}
        >
          {selectRef && (
            <VirtualScroller
              data={options}
              dataKey="value"
              height={50}
              nodeContent={(option) => this.renderItemContent(option)}
              nodeElement={(option, index) =>
                this.renderItemWrapper(option, index)
              }
              root={selectRef}
            />
          )}
        </div>
      );
    },

    renderItemContent(option: SelectOption) {
      const { selectedValue } = this;

      const isSelected = selectedValue?.includes(String(option.value));

      return (
        <div>
          {isSelected} {option.caption}
        </div>
      );
    },

    renderItemWrapper(option: SelectOption, index: number) {
      const {
        activeItemIndex,
        color,
        handleFocusItem,
        handleSelectItem,
        selectedValue,
      } = this;

      const isActive = activeItemIndex === index;
      const isSelected = selectedValue?.includes(String(option.value));

      const classes = {
        "bg-blue-600/20": color === "blue" && isSelected,
        "bg-gray-600/20": color === "gray" && isSelected,
        "bg-red-600/20": color === "red" && isSelected,
        "bg-teal-600/20": color === "teal" && isSelected,

        "bg-blue-600/10": color === "blue" && isActive,
        "bg-gray-600/10": color === "gray" && isActive,
        "bg-red-600/10": color === "red" && isActive,
        "bg-teal-600/10": color === "teal" && isActive,
      };

      return (
        <div
          class={[classes, "h-10 flex items-center cursor-pointer"]}
          onClick={() => handleSelectItem(option.value)}
          onMouseout={() => handleFocusItem(-1)}
          onMouseover={() => handleFocusItem(index)}
        />
      );
    },
  },

  render() {
    const {
      color,
      error,
      handleKeyup,
      selectedOptions,
      size,
      whenShowDropdown,
    } = this;

    return (
      <Tippy
        interactive
        interactiveBorder={0}
        maxWidth="none"
        trigger="focusin"
        v-slots={{
          default: () => (
            <BaseInput
              ref="inputRef"
              color={color}
              hasError={!!error}
              size={size}
              v-slots={{
                value: () =>
                  selectedOptions?.map((item) => item.label).join(", "),
              }}
              whenKeyup={handleKeyup}
            />
          ),
          content: () => this.renderDropdown(),
        }}
        onShow={whenShowDropdown}
      />
    );
  },
});

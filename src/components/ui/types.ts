import type { BUTTON_TYPES } from "@/components/ui/buttons/constants";
import type { COLORS, SIZE, VARIANTS } from "@/components/ui/constants";
import type { ICONS } from "@/components/ui/icon/constants";
import type { INPUT_TYPES } from "@/components/ui/input/constants";

export type Color = keyof typeof COLORS;
export type Icon = keyof typeof ICONS;
export type Size = keyof typeof SIZE;
export type ButtonType = keyof typeof BUTTON_TYPES;
export type Variant = keyof typeof VARIANTS;
export type InputType = keyof typeof INPUT_TYPES;

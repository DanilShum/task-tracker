export const BUTTON_TYPES = { button: "button", submit: "submit" };
export const COLORS = { blue: "blue", gray: "gray", red: "red", teal: "teal" };
export const SIZE = { default: "default", large: "large", small: "small" };
export const VARIANTS = {
  flat: "flat",
  primary: "primary",
  secondary: "secondary",
};

export type Color = keyof typeof COLORS;
export type Size = keyof typeof SIZE;
export type Type = keyof typeof BUTTON_TYPES;
export type Variant = keyof typeof VARIANTS;

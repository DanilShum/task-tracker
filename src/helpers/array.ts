export const wrapIntoArray = (value: any): any[] =>
  Array.isArray(value) ? value : [value];

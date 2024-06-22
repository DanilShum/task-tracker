// TODO Если передать массив, то будет ошибка с типами
export const wrapIntoArray = <T>(value: T): T[] =>
  Array.isArray(value) ? value : [value];

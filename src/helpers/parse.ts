export const parseNumber = (value?: string | number) => {
  if (!value && value !== 0) return undefined;
  if (Number(value) === 0) return 0;

  return Number(parseFloat(String(value)).toFixed(2));
};

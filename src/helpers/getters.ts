export const isFile = (value: object) => value instanceof File;

export const isImage = (type: string): boolean =>
  /.(gif|jpeg|jpg|png)$/i.test(type.toLowerCase());

export const isTime = (value: string): boolean =>
  /^(\d{2}:\d{2}).*$/.test(value);

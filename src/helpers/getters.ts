import { i18n } from "@/plugins/i18n";

type User = { id: number | string; name: string; login: string };

export const getName = (...args: Array<string | null | undefined>) =>
  getNameRaw(...args) ?? i18n.global.t("common.no-name");

export const getNameRaw = (...args: Array<string | null | undefined>) => {
  const composed = args.reduce((acc, curr) => {
    if (!curr) return acc;
    return `${acc} ${curr}`;
  }, "");

  return composed?.trim() || undefined;
};

export const getUserLogin = (user: string | Partial<User>) =>
  typeof user === "object" ? user.login : user;

export const isFile = (value: object) => value instanceof File;

export const isImage = (type: string): boolean =>
  /.(gif|jpeg|jpg|png)$/i.test(type.toLowerCase());

export const isTime = (value: string): boolean =>
  /^(\d{2}:\d{2}).*$/.test(value);

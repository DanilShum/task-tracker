/* eslint-disable import/no-duplicates */
import { format } from "date-fns";
import { enUS, ru, tr, zhCN } from "date-fns/locale";

import { convertIsoToDate } from "./dates";

import { i18n } from "@/plugins/i18n";

export const LocalesDictionary = {
  ru: ru,
  en: enUS,
  tr: tr,
  "zh-Hans": zhCN,
};

const boolean = (value?: boolean) =>
  value
    ? i18n.global.t("common.boolean.true")
    : i18n.global.t("common.boolean.false");

const date = (
  value?: string | number | Date,
  formatString?: string,
  options?: Parameters<typeof format>[2]
) => {
  if (!value) return undefined;

  const date = typeof value === "string" ? convertIsoToDate(value) : value;

  if (!date) return undefined;

  return format(date, formatString ?? "dd.MM.yyyy HH:mm", {
    locale: LocalesDictionary[i18n.global.locale as unknown as Lang],
    ...options,
  });
};

const duration = (value?: string) => {
  if (!value) return undefined;

  const date = new Date();

  date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
  date.setSeconds(Number(value));

  return format(date, "HH:mm:ss", {
    locale: LocalesDictionary[i18n.global.locale as unknown as Lang],
  }).replace(/^00:/g, "");
};

const money = (value?: string | number, withCurrency = true) => {
  if (!value && value !== 0) return undefined;

  const roubles = parseInt(value as string);

  return new Intl.NumberFormat("ru-RU", {
    ...(withCurrency && {
      currency: "RUB",
      style: "currency",
    }),
    minimumFractionDigits: 0,
  }).format(roubles);
};

const number = (value?: string | number) => {
  if (!value && value !== 0) return undefined;

  const parsed = Number(parseFloat(String(value)).toFixed(2));
  const formatted = new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 2,
    signDisplay: "negative",
  } as any).format(parsed);

  return isNaN(parsed) ? undefined : formatted;
};

const percent = (value?: string | number) => {
  if (!value && value !== 0 && !(typeof value === "number" && isNaN(value)))
    return undefined;

  const parsed = Number(parseFloat(String(value)).toFixed(2));

  return parsed === 0 || isNaN(parsed) || parsed === Infinity
    ? 0
    : Math.round(parsed * 100);
};

const truncate = (text: string, length = 20) => {
  if (!text) return "";

  return text.length > length ? `${text.substring(0, length)}...` : text;
};

export const formatters = {
  boolean,
  date,
  duration,
  money,
  number,
  percent,
  truncate,
};

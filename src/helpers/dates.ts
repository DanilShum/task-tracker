import {
  compareAsc,
  compareDesc,
  endOfQuarter,
  formatISO,
  hoursToMilliseconds,
  isSameMonth,
  millisecondsToHours,
  millisecondsToMinutes,
  minutesToMilliseconds,
  parseISO,
  toDate,
} from "date-fns";

import { formatters } from "@/helpers/format";

const HOUR_IN_MS = 3600000;

export const convertIsoToDate = (value?: string | null): Date | undefined => {
  if (!value) return;

  const fixedValue = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\s\d{2}:\d{2}/.test(
    value
  )
    ? value.replace(/\s/g, "+")
    : value;

  return toDate(parseISO(fixedValue));
};

export const convertDateToIso = (value?: Date | null): string | undefined => {
  if (!value) return;

  return formatISO(value);
};

export const convertMsToTime = (time?: string) => {
  if (!time) return;

  const hours = millisecondsToHours(Number(time));
  const minutes = millisecondsToMinutes(Number(time) - hours * HOUR_IN_MS);
  const date = formatISO(new Date().setHours(hours, minutes) as any);

  return formatters.date(date, "HH:mm");
};

export const convertTimeToMs = (time: string) => {
  const parsedTime = parseTime(time);

  if (!parsedTime) return;

  return (
    hoursToMilliseconds(parsedTime.hours) +
    minutesToMilliseconds(parsedTime.minutes)
  ).toString();
};

export const getIsLastMonthOfQuarter = () => {
  const now = new Date();
  const quarterEnd = endOfQuarter(now);

  return isSameMonth(now, quarterEnd);
};

export const parseTime = (value?: string) => {
  const match = (value as any)?.match(/^(\d{2}):(\d{2})$/);
  if (!match) return undefined;
  return { hours: Number(match[1]), minutes: Number(match[2]) };
};

export const sortByDate =
  (key: string, order: "asc" | "desc" = "desc") =>
  (a: Record<string, any>, b: Record<string, any>) => {
    const comparisonFn = order === "desc" ? compareDesc : compareAsc;
    return comparisonFn(
      convertIsoToDate(a[key]) as any,
      convertIsoToDate(b[key]) as any
    );
  };

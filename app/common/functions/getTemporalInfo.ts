import {
  DAYS_OF_WEEK_SHORT,
  DAYS_OF_WEEK_LONG,
  MONTHS_OF_YEAR_LONG,
  MONTHS_OF_YEAR_SHORT,
} from "@/app/constants/constants";
import { addZero } from "./addZero";

type DateInfoType = {
  day: number;
  dayOfWeekShort: string;
  dayOfWeekLong: string;
  monthShort: string;
  monthLong: string;
  year: number;
  yearShort: string;
  DDMMYYYY: string;
  MMDDYYYY: string;
  HHMMSS: string;
};

export const getDateInfo = (date: Date): DateInfoType => {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const dayOfWeekShort = DAYS_OF_WEEK_SHORT[date.getDay()];
  const dayOfWeekLong = DAYS_OF_WEEK_LONG[date.getDay()];
  const monthShort = MONTHS_OF_YEAR_SHORT[monthIndex];
  const monthLong = MONTHS_OF_YEAR_LONG[monthIndex];
  const year = date.getFullYear();
  const yearShort = year.toString().slice(-2);

  const DDMMYYYY = `${addZero(day)}/${addZero(monthIndex + 1)}/${year}`;
  const MMDDYYYY = `${addZero(monthIndex + 1)}/${addZero(day)}/${year}`;
  const HHMMSS = `${addZero(date.getHours())}:${addZero(
    date.getMinutes()
  )}:${addZero(date.getSeconds())}`;

  return {
    day,
    dayOfWeekShort,
    dayOfWeekLong,
    monthShort,
    monthLong,
    year,
    yearShort,
    DDMMYYYY,
    MMDDYYYY,
    HHMMSS,
  };
};

export const getTimeInfo = (time: string): string => {
  if (!time) return "";
  console.log(time);

  const hours = time.slice(0, 2);
  const minutes = time.slice(3, 5);
  const seconds = time.slice(6, 8);
  return `${hours}:${minutes}${seconds ? `:${seconds}` : ""}`;
};

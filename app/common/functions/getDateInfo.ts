import {
  DAYS_OF_WEEK_SHORT,
  DAYS_OF_WEEK_LONG,
  MONTHS_OF_YEAR_LONG,
  MONTHS_OF_YEAR_SHORT,
} from "@/app/constants/constants";

export const getDateInfo = (date: Date) => {
  const day = date.getDate();
  const dayOfWeekShort = DAYS_OF_WEEK_SHORT[date.getDay()];
  const dayOfWeekLong = DAYS_OF_WEEK_LONG[date.getDay()];
  const monthShort = MONTHS_OF_YEAR_SHORT[date.getMonth()];
  const monthLong = MONTHS_OF_YEAR_LONG[date.getMonth()];
  const year = date.getFullYear();
  const yearShort = year.toString().slice(-2);

  const DDMMYYYY = `${day}/${monthShort}/${year}`;
  const MMDDYYYY = `${monthShort}/${day}/${year}`;

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
  };
};

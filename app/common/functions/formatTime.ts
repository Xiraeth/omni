/**
 * Format the time with seconds
 * @param date - The date to format
 * @returns The formatted time in the format of HH:MM:SS
 */
export const formatTimeWithSeconds = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

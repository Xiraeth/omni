"use client";

type UrlParamsInput = {
  params: string;
  value: string | null;
};

/**
 * Updates URL parameters without using React hooks
 * @param params - The parameter name to update
 * @param value - The new value for the parameter
 * @returns void - only changes the URL parameters
 */
export const changeUrlParams = ({ params, value }: UrlParamsInput): void => {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);

  if (value) {
    url.searchParams.set(params, value);
  } else {
    url.searchParams.delete(params);
  }
  window.history.pushState({}, "", url);
};

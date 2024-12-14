"use client";

type UrlParamsInput = {
  params: string;
  value: string;
};

/**
 * Updates URL parameters without using React hooks
 * @param params - The parameter name to update
 * @param value - The new value for the parameter
 */
export const changeUrlParams = ({ params, value }: UrlParamsInput): void => {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);

  url.searchParams.set(params, value);
  window.history.pushState({}, "", url);
};

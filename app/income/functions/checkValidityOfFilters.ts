export const checkValidityOfFilters = (dateFrom?: string, dateTo?: string) => {
  if (!dateFrom || !dateTo) {
    return true;
  }

  if (new Date(dateFrom) > new Date(dateTo)) {
    return false;
  }

  return true;
};

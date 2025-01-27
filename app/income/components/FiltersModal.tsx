import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  INCOME_CATEGORIES,
  INCOME_CATEGORIES_LOWERCASE,
  INITIAL_FILTERS_DATA,
} from "@/app/constants/constants";
import DateInput from "./DateInput";
import GenericButton from "@/app/components/GenericButton";
import FormElement from "@/app/components/FormElement";
import { CategoriesType, FiltersType } from "@/app/types/income";
import { checkValidityOfFilters } from "../functions/checkValidityOfFilters";

const FiltersModal = ({
  handleCloseFiltersModal,
}: {
  handleCloseFiltersModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const filtersFromCache = queryClient.getQueryData<FiltersType>([
    "filtersData",
  ]);
  const [filtersData, setFiltersData] = useState<FiltersType>(
    filtersFromCache || INITIAL_FILTERS_DATA
  );
  const [dateError, setDateError] = useState<string>("");

  const handleToggleCategory = (category: string | undefined) => {
    if (!category) return;

    setFiltersData((prev) => ({
      ...prev,
      toggledCategories: prev.toggledCategories?.includes(
        category as CategoriesType
      )
        ? prev.toggledCategories?.filter((c) => c !== category)
        : [...(prev.toggledCategories || []), category as CategoriesType],
    }));
  };

  const handleSaveFilters = () => {
    if (!checkValidityOfFilters(filtersData?.dateFrom, filtersData?.dateTo)) {
      setDateError("Date from cannot be after date to");
      return;
    }

    setDateError("");

    queryClient.setQueryData(["filtersData"], filtersData);

    handleCloseFiltersModal();
  };

  const handleClearFilters = () => {
    setFiltersData(INITIAL_FILTERS_DATA);
    queryClient.removeQueries({ queryKey: ["filtersData"] });
    handleCloseFiltersModal();
  };

  useEffect(() => {
    // Function to handle keydown events
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseFiltersModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCloseFiltersModal]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-[2px]"
        onClick={handleCloseFiltersModal}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      bg-light dark:bg-dark rounded-lg shadow-xl transition-all duration-200
      w-[90%] max-w-[400px] p-6"
      >
        <div className="flex items-center justify-center mb-4">
          <p
            id="modal-title"
            className="text-base md:text-lg font-bold text-dark dark:text-light font-montserrat"
          >
            Filter data to be displayed
          </p>
          <button
            onClick={handleCloseFiltersModal}
            className="absolute right-[-10px] top-[-10px] bg-light hover:bg-dark hover:text-light rounded-full w-[35px] h-[35px] flex items-center justify-center transition-all duration-200 text-xl dark:bg-dark dark:hover:bg-light dark:text-light dark:hover:text-dark"
          >
            <FontAwesomeIcon icon={faXmark} className="" />
          </button>
        </div>

        <div className="text-sm md:text-base font-lato">
          <input
            type="text"
            placeholder="Filter by name"
            className="py-2 px-4 bg-white/30 hover:bg-white/40 focus:bg-white/60 rounded-md w-full text-dark dark:text-light outline-none focus:border-b-black font-montserrat text-sm
            dark:bg-buttonBgDark dark:hover:bg-buttonBgDarkFocus dark:focus:bg-buttonBgDarkFocus
            transition-all duration-150"
            value={filtersData.filterName}
            onChange={(e) =>
              setFiltersData({
                ...filtersData,
                filterName: e.target.value,
              })
            }
          />

          <p className="font-montserrat text-dark dark:text-light font-bold mt-4 text-center">
            Toggle categories
          </p>
          <div className="flex flex-col gap-[1px]">
            {INCOME_CATEGORIES_LOWERCASE.map((category, index) => (
              <div
                key={category}
                className="flex items-center justify-between gap-2 mt-2"
              >
                <p className="text-dark dark:text-light font-roboto">
                  {INCOME_CATEGORIES[index]}
                </p>
                <Checkbox
                  checked={
                    filtersData?.toggledCategories?.includes(
                      category as CategoriesType
                    ) || false
                  }
                  onCheckedChange={() => handleToggleCategory(category)}
                />
              </div>
            ))}
          </div>

          <p className="font-montserrat text-dark dark:text-light font-bold mt-4 text-center">
            Date range
          </p>

          <div className="flex items-center justify-between gap-2 mt-2 mb-4">
            <DateInput
              width="w-10/12 md:max-w-40"
              value={filtersData?.dateFrom || ""}
              onChange={(e) =>
                setFiltersData({
                  ...filtersData,
                  dateFrom: e.target.value,
                })
              }
            />
            <DateInput
              width="w-10/12 md:max-w-40"
              value={filtersData?.dateTo || ""}
              onChange={(e) =>
                setFiltersData({
                  ...filtersData,
                  dateTo: e.target.value,
                })
              }
            />
          </div>

          <FormElement errorMsg={dateError}>
            <GenericButton
              text="Save"
              height="md"
              onClick={handleSaveFilters}
            />

            <GenericButton
              text="Clear"
              height="md"
              onClick={handleClearFilters}
            />
          </FormElement>
        </div>
      </div>
    </>
  );
};

export default FiltersModal;

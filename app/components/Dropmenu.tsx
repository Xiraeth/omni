import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type DropmenuPropsType = {
  options: string[];
  placeholder: string;
  onSelect: (option: string) => void;
  value: string;
  width?: string;
  height?: string;
  className?: string;
};

const Dropmenu = ({
  options,
  onSelect,
  placeholder,
  value,
  height,
  width = "full",
  className,
}: DropmenuPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(value);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        isFocused
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setSelectedOption(option);
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsFocused(!isFocused);
  };

  return (
    <div
      className={clsx("relative", width ? width : "w-fit")}
      ref={dropdownRef}
    >
      <div
        className={clsx(
          "font-lato drop-shadow-md border-[1px] rounded-md cursor-pointer transition-all duration-200 md:max-w-72 text-dark dark:text-light",
          {
            "dark:border-amber-400 dark:hover:border-amber-400 border-sky-400 hover:border-sky-400 dark:bg-buttonBgDarkFocus bg-buttonBgLightFocus":
              isOpen,
            "hover:border-buttonBorderLightHover dark:border-slate-600 dark:hover:border-slate-500 dark:bg-buttonBgDark bg-buttonBgLight":
              !isOpen,
          },
          width ? width : "w-fit",
          className
        )}
        onClick={handleToggleDropdown}
      >
        <div
          className={clsx(
            "flex items-center justify-center lg:justify-between gap-2 lg:gap-0 px-2",
            height ? height : "h-[46px]"
          )}
        >
          <span>
            {selectedOption?.charAt(0).toUpperCase() +
              selectedOption?.slice(1) || placeholder}
          </span>
          {isOpen ? (
            <FontAwesomeIcon icon={faChevronUp} className="text-xs" />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className={clsx(
            "absolute left-0 w-full z-50 text-xs lg:text-sm",
            height ? height : "top-[50px]"
          )}
        >
          <div
            className={clsx(
              "bg-white dark:bg-slate-900 border-[1px] border-slate-400/80 dark:border-slate-600 rounded-md overflow-hidden"
            )}
          >
            {options.map((option, index) => {
              const isLast = index === options.length - 1;
              const isFirst = index === 0;

              return (
                <div
                  className={clsx(
                    "cursor-pointer px-4 py-2 hover:bg-slate-200/80 dark:hover:bg-slate-800 text-dark dark:text-light transition-all duration-200",
                    {
                      "rounded-t-md": isFirst,
                      "rounded-b-md": isLast,
                    }
                  )}
                  key={option}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropmenu;

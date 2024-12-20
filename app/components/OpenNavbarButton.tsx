import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeUrlParams } from "../common/functions/changeParams";

const OpenNavbarButton = () => {
  const onOpenClick = () => {
    changeUrlParams({ params: "isNavbarOpen", value: "true" });
  };

  return (
    <div
      onClick={onOpenClick}
      className="fixed top-[22px] left-4 w-8 h-8 flex hover:bg-slate-200 items-center justify-center transition-all duration-200 active:bg-slate-300 drop-shadow-lg shadow-black dark:text-light dark:hover:bg-slate-500 dark:active:bg-slate-400 cursor-pointer rounded-full"
    >
      <FontAwesomeIcon
        icon={faAnglesRight}
        className="w-4 h-4 text-dark dark:text-light"
      />
    </div>
  );
};

export default OpenNavbarButton;

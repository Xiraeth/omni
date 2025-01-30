import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="size-4 animate-spin text-dark dark:text-light"
      />
    </div>
  );
};

export default Loader;

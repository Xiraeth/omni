import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";

const FiltersModal = ({
  handleCloseFiltersModal,
}: {
  handleCloseFiltersModal: () => void;
}) => {
  const queryClient = useQueryClient();

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
      w-[90%] max-w-[600px] p-6"
      >
        <div className="flex items-center mb-4">
          <p
            id="modal-title"
            className="text-base md:text-xl font-bold text-dark dark:text-light"
          >
            Select filters
          </p>
          <button
            onClick={handleCloseFiltersModal}
            className="absolute right-[-10px] top-[-10px] bg-light hover:bg-dark hover:text-light rounded-full w-[35px] h-[35px] flex items-center justify-center transition-all duration-200 text-xl dark:bg-dark dark:hover:bg-light dark:text-light dark:hover:text-dark"
          >
            <FontAwesomeIcon icon={faXmark} className="" />
          </button>
        </div>

        <div className="space-y-4 text-sm md:text-base">This is content</div>
      </div>
    </>
  );
};

export default FiltersModal;

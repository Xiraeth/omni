import clsx from "clsx";
import ButtonOuttline from "./ButtonOuttline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

const Modal = ({
  onConfirm,
  onCancel,
  header,
  text,
  children,
  width,
  height,
}: {
  onConfirm?: () => void;
  onCancel?: () => void;
  header?: string;
  text?: string;
  children?: React.ReactNode;
  width?: string;
  height?: string;
}) => {
  return (
    <>
      {/* Overlay */}
      <div className="absolute inset-0 z-20 bg-black/50 backdrop-blur-sm" />

      {/* Modal Content */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div
          className={clsx(
            "bg-white/50 relative dark:bg-black/50 p-8 rounded-md flex flex-col items-center justify-center gap-4 text-dark dark:text-light",
            width,
            height
          )}
        >
          {onCancel && (
            <div
              className="absolute text-lg -top-2 -right-2 size-8 rounded-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 flex items-center justify-center cursor-pointer"
              onClick={onCancel}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          )}

          {children ? (
            children
          ) : (
            <>
              <h1 className="text-2xl font-bold text-red-500">{header}</h1>
              <p className="text-sm">{text}</p>
              <div className="flex justify-center gap-2 w-full">
                <ButtonOuttline
                  text="Yes"
                  onClick={onConfirm}
                  className="w-1/3"
                />
                <ButtonOuttline
                  text="No"
                  onClick={onCancel}
                  className="w-1/3"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;

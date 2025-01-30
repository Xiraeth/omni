import { useTheme } from "@/app/context/ThemeContext";
import { Slide, Zoom, Flip, Bounce, toast } from "react-toastify";

type ToastPropsType = {
  message?: string;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  closeButton?: boolean;
  type?: "success" | "error" | "info" | "warning";
  pauseOnHover?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
  transition?: typeof Slide | typeof Zoom | typeof Flip | typeof Bounce;
};

// example usage: const successToast = useCustomToast({ type: "success", message: "Category created" });
// successToast();

const useCustomToast = (toastProps: ToastPropsType) => {
  const { theme } = useTheme();

  const customToast = (message?: string) => {
    toast[toastProps.type || "success"](message || toastProps.message, {
      position: toastProps.position || "top-right",
      autoClose: toastProps.autoClose || 5000,
      hideProgressBar: toastProps.hideProgressBar || false,
      pauseOnHover: toastProps.pauseOnHover || true,
      pauseOnFocusLoss: toastProps.pauseOnFocusLoss || false,
      draggable: toastProps.draggable || false,
      closeOnClick: toastProps.closeOnClick || false,
      closeButton: toastProps.closeButton || true,
      transition: toastProps.transition || Slide,
      theme,
    });
  };

  return customToast;
};

export default useCustomToast;

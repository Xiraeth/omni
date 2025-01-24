import { useTheme } from "@/app/context/ThemeContext";
import { toast } from "react-toastify";

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
};

const useCustomToast = (toastProps: ToastPropsType) => {
  const { theme } = useTheme();

  const customToast = () => {
    toast[toastProps.type || "success"](toastProps.message, {
      position: toastProps.position || "top-right",
      autoClose: toastProps.autoClose || 5000,
      hideProgressBar: toastProps.hideProgressBar || false,
      pauseOnHover: toastProps.pauseOnHover || false,
      pauseOnFocusLoss: toastProps.pauseOnFocusLoss || false,
      draggable: toastProps.draggable || false,
      closeOnClick: toastProps.closeOnClick || false,
      closeButton: toastProps.closeButton || false,
      theme,
    });
  };

  return customToast;
};

export default useCustomToast;

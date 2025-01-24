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
};

const useToast = (toastProps: ToastPropsType) => {
  const { theme } = useTheme();

  const customToast = () => {
    toast(toastProps.message, {
      position: toastProps.position,
      autoClose: toastProps.autoClose,
      hideProgressBar: toastProps.hideProgressBar,
      closeOnClick: toastProps.closeOnClick,
      closeButton: toastProps.closeButton,
      type: toastProps.type,
      theme,
    });
  };

  return customToast;
};

export default useToast;

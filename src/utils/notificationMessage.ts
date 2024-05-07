import { toast } from "react-toastify";

type MessageType = "error" | "success" | "warning" | "info";

enum MessagePosition {
  BOTTOM_RIGHT = "bottom-right",
}

export const notificationMessage = (type: MessageType, message: string) => {
  switch (type) {
    case "error":
      return toast.error(message, { position: MessagePosition.BOTTOM_RIGHT });

    case "warning":
      return toast.warning(message, { position: MessagePosition.BOTTOM_RIGHT });

    case "info":
      return toast.info(message, { position: MessagePosition.BOTTOM_RIGHT });

    case "success":
    default:
      return toast.success(message, { position: MessagePosition.BOTTOM_RIGHT });
  }
};

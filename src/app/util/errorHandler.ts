// src/utils/notification.ts
import { notification } from "antd";
import { AppError } from "@/app/dto/error.dto";

type NotificationType = "success" | "info" | "warning" | "error";

// A helper function to show different types of notifications
export const notify = (
  type: NotificationType,
  title: string,
  description: string
) => {
  notification[type]({
    message: title,
    description,
    placement: "topRight", // You can change the position
  });
};

// This function will be used for custom error handling based on error type
export const notifyError = (error: AppError) => {
  const { type, message, description } = error;

  switch (type) {
    case "ValidationError":
      return notify(
        "warning",
        message,
        description || "Please fix the validation errors."
      );
    case "NetworkError":
      return notify(
        "error",
        message,
        description || "Please check your network connection."
      );
    case "NotFoundError":
      return notify(
        "info",
        message,
        description || "The resource you are looking for was not found."
      );
    case "UnauthorizedError":
      return notify(
        "warning",
        message,
        description || "You are not authorized to perform this action."
      );
    case "UnexpectedError":
    default:
      return notify(
        "error",
        message,
        description || "An unexpected error occurred. Please try again."
      );
  }
};

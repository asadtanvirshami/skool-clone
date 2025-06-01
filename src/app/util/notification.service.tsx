"use client";
// src/utils/notification.service.tsx
import { notification } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CloseOutlined, // For custom close icon
} from "@ant-design/icons";
import React from "react";
import { AppError } from "@/app/dto/error.dto";
// --- Hardcoded styles for Error Notifications ---
const HARDCODED_ERROR_BACKGROUND_COLOR = "#f5222d"; // Ant Design Error Red
const HARDCODED_ERROR_TEXT_COLOR = "#ffffff"; // White
const HARDCODED_ERROR_ACCENT_COLOR = "#ffffff"; // White (for icon and close button)

// --- Existing text styles for other notification types ---
const whiteTextStyle: React.CSSProperties = { color: "#ffffff" }; // Used by success/warning
const lightGrayTextStyle: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.85)",
}; // Used by success/warning
const darkGrayTextStyle: React.CSSProperties = { color: "#595959" };
const darkGrayTitleStyle: React.CSSProperties = { color: "#333333" };

// --- Common antd notification arguments ---
interface CommonNotificationOptions {
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  duration?: number | null;
  key?: string;
  onClose?: () => void;
  onClick?: () => void;
}

// --- showError function with hardcoded styles ---
export const showError = (
  appError: AppError, // We still take AppError for message, description, and type
  options?: CommonNotificationOptions
): void => {
  // Note: The appError.style.background, appError.style.color, and appError.style.accentColor
  // from the DTO will be ignored by this function in favor of hardcoded values.
  notification.open({
    ...options,
    message: (
      <span style={{ color: HARDCODED_ERROR_TEXT_COLOR }}>
        {appError.message}
      </span>
    ),
    description: appError.description ? (
      <span style={{ color: HARDCODED_ERROR_TEXT_COLOR }}>
        {appError.description}
      </span>
    ) : undefined,
    icon: (
      <CloseCircleOutlined style={{ color: HARDCODED_ERROR_ACCENT_COLOR }} />
    ),
    style: {
      // Style for the notification panel itself
      backgroundColor: HARDCODED_ERROR_BACKGROUND_COLOR,
    },
    closeIcon: (
      <CloseOutlined style={{ color: HARDCODED_ERROR_ACCENT_COLOR }} />
    ),
  });
};

// --- Other Notification Functions (showSuccess, showWarning, showInfo - unchanged) ---

export const showSuccess = (
  messageContent: React.ReactNode,
  descriptionContent?: React.ReactNode,
  options?: CommonNotificationOptions
): void => {
  // Default Ant Design success (green background, white text usually)
  // Explicitly styling text to white/lightGray for consistency if preferred.
  notification.success({
    ...options,
    message: <span style={whiteTextStyle}>{messageContent}</span>,
    description: descriptionContent ? (
      <span style={lightGrayTextStyle}>{descriptionContent}</span>
    ) : undefined,
  });
};

export const showWarning = (
  messageContent: React.ReactNode,
  descriptionContent?: React.ReactNode
): void => {
  // Default Ant Design warning (yellow background, dark text usually, but we forced white text earlier)
  // Sticking to white/lightGray text for consistency with previous requests.
  notification.warning({
    style: { backgroundColor: "#faad14", color: "#fff" },
    message: <span style={whiteTextStyle}>{messageContent}</span>,
    // Ensure this contrasts with default warning bg
    description: descriptionContent ? (
      <span style={lightGrayTextStyle}>{descriptionContent}</span>
    ) : undefined,
  });
};

export const showInfo = (
  messageContent: React.ReactNode,
  descriptionContent?: React.ReactNode,
  options?: CommonNotificationOptions
): void => {
  notification.open({
    ...options,
    message: <span style={darkGrayTitleStyle}>{messageContent}</span>,
    description: descriptionContent ? (
      <span style={darkGrayTextStyle}>{descriptionContent}</span>
    ) : undefined,
    icon: <InfoCircleOutlined style={{ color: "#1677ff" }} />,
    style: {
      backgroundColor: "#ffffff",
    },
  });
};

// --- Global Configuration ---
export const configureGlobalNotifications = (): void => {
  notification.config({
    placement: "topRight",
    duration: 4.5,
  });
};

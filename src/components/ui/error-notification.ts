import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducer/reducer";
import { clearError } from "@/redux/actions/error-action";
import { notification } from "antd";
import { AppDispatch } from "@/redux/store";

const ErrorNotification: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.error.error);

  if (error) {
    notification.error({
      message: "Error Occurred",
      description: error,
      duration: 3,
      onClose: () => dispatch(clearError()),
    });
  }

  return null;
};

export default ErrorNotification;

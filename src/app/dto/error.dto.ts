// src/dto/error.dto.ts

export type AppErrorType =
  | "ValidationError"
  | "NetworkError"
  | "NotFoundError"
  | "UnauthorizedError"
  | "UnexpectedError";

export interface AppError {
  type: AppErrorType;
  message: string;
  description?: string;
}

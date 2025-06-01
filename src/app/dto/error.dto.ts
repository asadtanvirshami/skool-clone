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
  style: { background: string; color: string; accentColor: string };
}

//Payload & Response [Login, Google]
export interface LoginResponse {
  accessToken: string;
  success: boolean;
  error?: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface GoogleCredentialResponse {
  credential: string;
}
export interface GoogleLoginResponse {
  success: boolean;
  accessToken: string;
}

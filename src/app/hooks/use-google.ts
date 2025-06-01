import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/api/user/user-api";
import { AxiosError } from "axios";

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleLoginResponse {
  success: boolean;
  accessToken: string;
}

export const useGoogleLogin = () =>
  useMutation<GoogleLoginResponse, AxiosError, GoogleCredentialResponse>({
    mutationFn: async (payload) => {
      const response = await userApi.google_signin(payload.credential);
      return response.data;
    },
  });

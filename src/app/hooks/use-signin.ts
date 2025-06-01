import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/api/user/user-api";
import { AxiosError } from "axios";

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: File;
}

interface SignupResponse {
  success: boolean;
  message?: string;
}

export const useSignup = () => {
  return useMutation<SignupResponse, AxiosError, SignupPayload>({
    mutationFn: async (payload) => {
      const response = await userApi.signup(
        payload.firstName,
        payload.lastName,
        payload.email,
        payload.password,
        payload.profileImage
      );

      if (response.data && !response.data.success) {
        throw new AxiosError(
          response.data.message || "Signup failed with success: false",
          AxiosError.ERR_BAD_REQUEST,
          undefined,
          undefined,
          response
        );
      }

      return response.data;
    },
  });
};

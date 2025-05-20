import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/api/user/user-api";
import { AxiosError } from "axios";
import { LoginPayload, LoginResponse } from "@/app/dto/auth.dto";

export const useLogin = () =>
  useMutation<LoginResponse, AxiosError, LoginPayload>({
    mutationFn: async (payload) => {
      const response = await userApi.login(payload.email, payload.password);
      return response.data;
    },
  });

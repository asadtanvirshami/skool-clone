import axios, { AxiosError } from "axios";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile_picture: string;
  blocked: boolean;
}

const userApi = {
  login: (email: string, password: string) => {
    return axios.post(
      (process.env.NEXT_PUBLIC_API_URL as string) + "user/auth/signin",
      {
        Email: email,
        Password: password,
      }
    );
  },

  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    profile_picture: File
  ) => {
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profile_picture", profile_picture);

      const response = axios.post(
        (process.env.NEXT_PUBLIC_API_URL as string) + "user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error Response:", error.response?.data);
        return error.response?.data;
      } else {
        console.error("Unexpected Error:", error);
        return { message: "An unexpected error occurred" };
      }
    }
  },

  google_signin: (tokenResponse: any) => {
    try {
      const response = axios.post(
        (process.env.NEXT_PUBLIC_API_URL as string) + "user/google-signin",
        {
          token: tokenResponse.credential,
        }
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error Response:", error.response?.data);
        return error.response?.data;
      } else {
        console.error("Unexpected Error:", error);
        return { message: "An unexpected error occurred" };
      }
    }
  },

  account_recovery: (email: string) => {
    try {
      const response = axios.post(
        (process.env.NEXT_PUBLIC_API_URL as string) + "user/account-recovery",
        {
          email: email,
        }
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error Response:", error.response?.data);
        return error.response?.data; 
      } else {
        console.error("Unexpected Error:", error);
        return { message: "An unexpected error occurred" };
      }
    }
  },

  resendOtp: (id: string) => {
    try {
      const response = axios.post(
        (process.env.NEXT_PUBLIC_API_URL as string) + `user/resend-otp/${id}`
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error Response:", error.response?.data);
        return error.response?.data; 
      } else {
        console.error("Unexpected Error:", error);
        return { message: "An unexpected error occurred" };
      }
    }
  },

  otp_verification: (otp: string) => {
    try {
      const response = axios.post(
        (process.env.NEXT_PUBLIC_API_URL as string) + "user/verify-otp",
        {
          otp: otp,
        }
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error Response:", error.response?.data);
        return error.response?.data; // Access the response property safely
      } else {
        console.error("Unexpected Error:", error);
        return { message: "An unexpected error occurred" };
      }
    }
  },
};

export { userApi };

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
    profileImage: File // Expecting a file input for the image
  ) => {
    try {
      // Create FormData object to send both text fields and image file
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", profileImage); // Append image file

      const response = axios.post(
        (process.env.NEXT_PUBLIC_API_URL as string) + "user/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
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
        (process.env.NEXT_PUBLIC_API_URL as string) + "user/auth/google-signin",
        {
          token: tokenResponse.credential,
        }
      );
      return response;
    } catch (error) {
      // Check if the error is an AxiosError and type it accordingly
      if (axios.isAxiosError(error)) {
        // Now TypeScript recognizes that error.response is valid
        console.error("Error Response:", error.response?.data);
        return error.response?.data; // Access the response property safely
      } else {
        // Handle unexpected errors
        console.error("Unexpected Error:", error);
        return { message: "An unexpected error occurred" };
      }
    }
  },
  account_recovery: (email: any) => {
    try {
      const response = axios.post(
        (process.env.NEXT_PUBLIC_API_URL as string) +
          "user/auth/account-recovery",
        {
          email: email,
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
  
  otp_verification: (otp: any) => {
    try {
      const response = axios.post(
        (process.env.NEXT_PUBLIC_API_URL as string) +
          "user/auth/otp-verification",
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

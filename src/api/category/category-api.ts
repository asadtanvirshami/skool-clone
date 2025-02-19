import axios, { AxiosError } from "axios";
const categoryApi = {
  get: async () => {
    try {
      const response = await axios.get(
        (process.env.NEXT_PUBLIC_API_URL as string) + "category/get"
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

export { categoryApi };

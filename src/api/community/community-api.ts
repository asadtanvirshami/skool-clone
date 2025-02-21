import axios from "axios";
const communityApi = {
  get: async () => {
    try {
      const response = await axios.get(
        (process.env.NEXT_PUBLIC_API_URL as string) + "community/get"
      );
      return response?.data;
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
};

export { communityApi };

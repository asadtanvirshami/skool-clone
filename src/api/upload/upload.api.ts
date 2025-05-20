import axios from "axios";

const fileApi = {
  upload: (id:string,file: File) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);
    try {
      const response = axios.post(
        (process.env.NEXT_PUBLIC_API_URL as string) + `file/upload/img/${id}`,
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
};

export { fileApi };

import axios, { AxiosError, AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized - Redirecting to login...");
    } else if (error.response?.status === 500) {
      console.warn("⚠️ Server Error - Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

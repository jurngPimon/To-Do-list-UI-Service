import axios, { AxiosError, AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response, // ✅ Pass successful responses
  (error: AxiosError) => {
    console.error("❌ Axios Error:", error.response?.status, error.message); // ✅ Logs error globally

    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized - Redirecting to login...");
    } else if (error.response?.status === 500) {
      console.warn("⚠️ Server Error - Please try again later.");
    }

    return Promise.reject(error); // ✅ Keeps the error so `catch` can handle it in API functions
  }
);

export default axiosInstance;

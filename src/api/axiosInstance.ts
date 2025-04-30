import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie } from "@/utils";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Intercept requests to attach Firebase Token
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getCookie("firebaseToken");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(new Error(error.message || "Request error"))
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized - Redirecting to login...");
    } else if (error.response?.status === 500) {
      console.warn("⚠️ Server Error - Please try again later.");
    }

    return Promise.reject(new Error(error.message || "Response error"));
  }
);

export default axiosInstance;

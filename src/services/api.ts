import axios, { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error?: string; message?: string; code?: string }>) => {
    const formattedError: ApiError = {
      message:
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      status: error.response?.status ?? 500,
      code: error.response?.data?.code,
      details: error.response?.data,
    };

    return Promise.reject(formattedError);
  },
);

export default api;

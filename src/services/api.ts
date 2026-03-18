import axios, { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
}

type BackendErrorResponse =
  | {
      error?: string;
      message?: string;
      code?: string;
    }
  | string;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<BackendErrorResponse>) => {
    const data = error.response?.data;

    const formattedError: ApiError = {
      message:
        (typeof data === "string" ? data : data?.error) ||
        (typeof data === "string" ? undefined : data?.message) ||
        error.message ||
        "Something went wrong",
      status: error.response?.status ?? 500,
      code: typeof data === "string" ? undefined : data?.code,
      details: data ?? null,
    };

    return Promise.reject(formattedError);
  },
);

export default api;

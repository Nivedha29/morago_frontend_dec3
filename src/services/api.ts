import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

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

interface StoredUser {
  token?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/publicResetPassword/reset/request",
  "/publicResetPassword/reset/verify",
  "/publicResetPassword/reset/confirm",
];

const getStoredToken = (): string | null => {
   const directToken = localStorage.getItem("token");

  if (directToken) return directToken;
  const rawUser = localStorage.getItem("currentUser");

  if (!rawUser) return null;

  try {
    const parsedUser: StoredUser = JSON.parse(rawUser);
    return parsedUser?.token || null;
  } catch {
    return null;
  }
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredToken();
  const requestUrl = config.url ?? "";
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    requestUrl.includes(route),
  );

  if (!isPublicRoute && token) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers = new AxiosHeaders(config.headers);
      config.headers.set("Authorization", `Bearer ${token}`);
    }
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

export const createCall = async ({
  recipientId,
  themeId,
}: {
  recipientId: number;
  themeId: number;
}) => {
  const response = await api.post("/call/create", {
    recipientId,
    themeId,
  });

  return response.data;
};

export default api;

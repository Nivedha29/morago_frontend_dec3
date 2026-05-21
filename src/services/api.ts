import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
}

export interface CallPayload {
  callId: number;
  callerId: number;
  translatorId: number;
  theme: string;
  callerName: string;
  costPerMinute: number;
  isFirst: boolean;
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

export const getStoredToken = (): string | null => {
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
}): Promise<CallPayload> => {
  const response = await api.post<CallPayload>("/call/create", {
    recipientId,
    themeId,
  });

  return response.data;
};

export const updateUserProfile = async (data: {
  firstname: string;
  lastname: string;
}) => {
  const response = await api.put("/user", data);
  return response.data;
};

export const updatePassword = async (data: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const response = await api.post("/profile/password/update", data);
  return response.data;
};

export const uploadUserAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/profile/avatar/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default api;
import api from "./api";

/* -------------------- SHARED TYPES -------------------- */
export type UserRole = "ROLE_USER" | "ROLE_TRANSLATOR" | "ROLE_ADMIN";

export interface AuthResponse {
  token: string;
  id: number;
  phone: string;
  firstName: string;
  lastName: string;
  roles: UserRole | UserRole[];
  imageUrl: string;
  levelOfKorean: number;
  dateOfBirth: string;
  selectedThemeIds: number[];
  selectedLanguageIds: number[];
}

/* -------------------- LOGIN -------------------- */
export interface LoginRequest {
  phone: string;
  password: string;
}

export const login = async (
  payload: LoginRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", payload);
  return response.data;
};

/* -------------------- REGISTER -------------------- */
export interface RegisterRequest {
  password: string;
  confirmPassword: string;
  phone: string;
  role: UserRole;
}

export const register = async (
  payload: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  return response.data;
};

/* -------------------- PASSWORD RESET: REQUEST CODE -------------------- */
export interface RequestPasswordResetCodeRequest {
  phone: string;
}

export const requestPasswordResetCode = async (
  payload: RequestPasswordResetCodeRequest,
): Promise<void> => {
  await api.post("/publicResetPassword/reset/request", payload);
};

/* -------------------- PASSWORD RESET: VERIFY CODE -------------------- */
export interface VerifyPasswordResetCodeRequest {
  phone: string;
  code: string;
}

export const verifyPasswordResetCode = async (
  payload: VerifyPasswordResetCodeRequest,
): Promise<string> => {
  const response = await api.post<string>(
    "/publicResetPassword/reset/verify",
    payload,
  );
  return response.data;
};

/* -------------------- PASSWORD RESET: CONFIRM PASSWORD -------------------- */
export interface ConfirmPasswordResetRequest {
  resetToken: string;
  newPassword: string;
}

export const confirmPasswordReset = async (
  payload: ConfirmPasswordResetRequest,
): Promise<string> => {
  const response = await api.post<string>(
    "/publicResetPassword/reset/confirm",
    payload,
  );
  return response.data;
};
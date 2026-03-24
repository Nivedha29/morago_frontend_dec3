import api from "./api";

export interface UserItem {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  balance: number;
  hasDepositRequest: boolean;
}

export interface UserListResponse {
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: UserItem[];
}

export interface GetAdminUsersParams {
  keyword?: string;
  isDebtor?: boolean;
  hasDeposit?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export const getAdminUsers = async (
  params: GetAdminUsersParams = {},
): Promise<UserListResponse> => {
  const response = await api.get("/admin/users", {
    params: {
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC",
      ...params,
    },
  });

  return response.data;
};

export interface UserDetailResponse {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  balance: number;
  hasDepositRequest: boolean;
}

export const getAdminUserById = async (
  id: number,
): Promise<UserDetailResponse> => {
  const response = await api.get(`/admin/users/${id}`);
  return response.data;
};

export interface UserCallHistoryItem {
  date: string;
  phone: string;
  name: string;
  imageUrl: string;
  duration: number;
  coins: number;
  theme: string;
  rating: string;
  hasRequest: boolean;
}

export interface UserCallHistoryResponse {
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: UserCallHistoryItem[];
}

export interface GetAdminUserCallHistoryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export const getAdminUserCallHistory = async (
  userId: number,
  params?: GetAdminUserCallHistoryParams,
): Promise<UserCallHistoryResponse> => {
  const response = await api.get(`/admin/calls/history/${userId}`, {
    params,
  });

  return response.data;
};

export interface UserDepositHistoryItem {
  id: number;
  date: string;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED" | string;
}

export interface UserDepositHistoryResponse {
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: UserDepositHistoryItem[];
}

export interface GetAdminUserDepositHistoryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export const getAdminUserDepositHistory = async (
  userId: number,
  params?: GetAdminUserDepositHistoryParams,
): Promise<UserDepositHistoryResponse> => {
  const response = await api.get(`/admin/deposits/history/${userId}`, {
    params,
  });

  return response.data;
};

export interface ApproveUserDepositPayload {
  sum: number;
}

export const approveAdminUserDeposit = async (
  depositId: number,
  payload: ApproveUserDepositPayload,
): Promise<void> => {
  await api.put(`/admin/deposits/${depositId}`, payload);
};

export interface CreateAdminUserPayload {
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface CreateAdminUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  balance: number;
  hasDepositRequest: boolean;
}

export const createAdminUser = async (
  payload: CreateAdminUserPayload,
): Promise<CreateAdminUserResponse> => {
  const response = await api.post("/admin/users", payload);
  return response.data;
};

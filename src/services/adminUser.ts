import api from "./api";

///////////////////////////////////////////////////////////
// USERS
///////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////
// Call History
///////////////////////////////////////////////////////////
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

export interface GetUserCallHistoryParams {
  userId: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export const getAdminUserCallHistory = async ({
  userId,
  page = 0,
  size = 5,
  sortBy = "id",
  sortDirection = "DESC",
}: GetUserCallHistoryParams): Promise<UserCallHistoryResponse> => {
  const response = await api.get(`/admin/calls/history/${userId}`, {
    params: {
      page,
      size,
      sortBy,
      sortDirection,
    },
  });

  return response.data;
};

///////////////////////////////////////////////////////////
// Deposit History
///////////////////////////////////////////////////////////

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

export interface GetUserDepositHistoryParams {
  userId: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export const getAdminUserDepositHistory = async ({
  userId,
  page = 0,
  size = 5,
  sortBy = "id",
  sortDirection = "DESC",
}: GetUserDepositHistoryParams): Promise<UserDepositHistoryResponse> => {
  const response = await api.get(`/admin/deposits/history/${userId}`, {
    params: {
      page,
      size,
      sortBy,
      sortDirection,
    },
  });

  return response.data;
};
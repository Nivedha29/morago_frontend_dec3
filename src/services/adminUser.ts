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
  params?: GetAdminUsersParams,
): Promise<UserListResponse> => {
  const response = await api.get("/admin/users", {
    params,
  });

  return response.data;
};

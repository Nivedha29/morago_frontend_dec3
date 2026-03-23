import api from "./api";

export interface Translator {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isOnline: boolean;
  levelOfKorean: number;
  hasWithdrawalRequest: boolean;
  averageRating: number;
}

export interface TranslatorListResponse {
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: Translator[];
}

export interface GetAdminTranslatorsParams {
  keyword?: string;
  isActive?: boolean;
  hasWithdrawal?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface WithdrawalHistoryItem {
  id: number;
  date: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
}

export interface WithdrawalHistoryResponse {
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: WithdrawalHistoryItem[];
}

export interface GetWithdrawalHistoryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export const getAdminTranslators = async (
  params: GetAdminTranslatorsParams = {},
): Promise<TranslatorListResponse> => {
  const response = await api.get("/admin/translators", {
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

export const getTranslatorById = async (translatorId: number) => {
  const response = await api.get(`/admin/translators/${translatorId}`);
  return response.data;
};

export const getWithdrawalHistoryByUserId = async (
  userId: number,
  params: GetWithdrawalHistoryParams = {},
): Promise<WithdrawalHistoryResponse> => {
  const response = await api.get(`/admin/withdrawals/history/${userId}`, {
    params,
  });

  return response.data;
};

export const getActiveWithdrawalByUserId = async (
  userId: number,
): Promise<ActiveWithdrawalResponse> => {
  const response = await api.get("/admin/withdrawals", {
    params: { userId },
  });

  return response.data;
};

export const approveWithdrawalById = async (
  id: number,
  payload: ApproveWithdrawalPayload,
): Promise<void> => {
  await api.put(`/admin/withdrawals/${id}`, payload);
};

export interface CallHistoryItem {
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

export interface CallHistoryResponse {
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: CallHistoryItem[];
}

export interface GetCallHistoryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export const getCallHistoryByUserId = async (
  userId: number,
  params: GetCallHistoryParams = {},
): Promise<CallHistoryResponse> => {
  const response = await api.get(`/admin/calls/history/${userId}`, {
    params,
  });

  return response.data;
};

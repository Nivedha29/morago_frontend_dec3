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

export interface CreateTranslatorPayload {
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface Language {
  id: number;
  name: string;
  titleEn: string;
  titleRu: string;
}

export interface Theme {
  id: number;
  name: string;
  title: string;
  titleEn: string;
  titleRu: string;
  description: string;
  descriptionEn: string;
  descriptionRu: string;
  isActive: boolean;
  iconId: number;
  categoryId: number;
  isPopular: boolean;
  iconUrl: string;
}

export interface TranslatorDetailResponse {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isOnline: boolean;
  levelOfKorean: number;
  dateOfBirth: string;
  hasWithdrawalRequest: boolean;
  languages: Language[];
  themes: Theme[];
  averageRating: number;
}

export interface WithdrawalHistoryItem {
  id: number;
  date: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface PageableSort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface PageableInfo {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: PageableSort;
  unpaged: boolean;
}

export interface WithdrawalHistoryResponse {
  totalElements: number;
  totalPages: number;
  pageable: PageableInfo;
  size: number;
  content: WithdrawalHistoryItem[];
  number: number;
  sort: PageableSort;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface GetWithdrawalHistoryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface ApproveWithdrawalPayload {
  fullName: string;
  bankName: string;
  bankAccount: string;
  sum: number;
}

export interface ActiveWithdrawalResponse {
  id: number;
  accountNumber: string;
  accountHolder: string;
  nameOfBank: string;
  sum: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export const getAdminTranslators = async (
  params: GetAdminTranslatorsParams = {},
): Promise<TranslatorListResponse> => {
  const response = await api.get("/admin/translators", { params });
  return response.data;
};

export const getTranslatorById = async (
  translatorId: number,
): Promise<TranslatorDetailResponse> => {
  const response = await api.get(`/admin/translators/${translatorId}`);
  return response.data;
};

export const createTranslator = async (
  payload: CreateTranslatorPayload,
): Promise<TranslatorDetailResponse> => {
  const response = await api.post("/admin/translators", payload);
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

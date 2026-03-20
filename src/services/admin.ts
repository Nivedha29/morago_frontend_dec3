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
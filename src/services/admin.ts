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

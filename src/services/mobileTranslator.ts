import api from "./api";

export interface FillTranslatorProfileRequest {
  firstName: string;
  lastName: string;
  imageUrl: string;
  levelOfKorean: number;
  dateOfBirth: string;
  themeIds: number[];
  languageIds: number[];
}

export interface TranslatorLanguage {
  id: number;
  name: string;
  titleEn: string;
  titleRu: string;
}

export interface TranslatorTheme {
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

export interface TranslatorProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isOnline: boolean;
  levelOfKorean: number;
  dateOfBirth: string;
  hasWithdrawalRequest: boolean;
  languages: TranslatorLanguage[];
  themes: TranslatorTheme[];
  averageRating: number;
}

export interface GetTranslatorThemesParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface PaginatedTranslatorThemesResponse {
  content: TranslatorTheme[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface UploadedAvatarResponse {
  id: number;
  originalTitle: string;
  path: string;
  size: number;
  type: string;
}

export const getTranslatorThemes = async (
  params: GetTranslatorThemesParams = {},
): Promise<PaginatedTranslatorThemesResponse> => {
  const response = await api.get<PaginatedTranslatorThemesResponse>(
    "/translator/themes",
    {
      params,
    },
  );
  return response.data;
};

export const getActiveLanguages = async (): Promise<TranslatorLanguage[]> => {
  const response = await api.get<TranslatorLanguage[]>("/api/languages");
  return response.data;
};

export const uploadAvatar = async (
  file: File,
): Promise<UploadedAvatarResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<UploadedAvatarResponse>(
    "/profile/avatar/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const fillTranslatorProfile = async (
  payload: FillTranslatorProfileRequest,
): Promise<TranslatorProfileResponse> => {
  const response = await api.put<TranslatorProfileResponse>(
    "/translator",
    payload,
  );
  return response.data;
};

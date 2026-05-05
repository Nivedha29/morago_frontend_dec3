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

export interface PatchTranslatorProfileRequest {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  levelOfKorean?: number;
  dateOfBirth?: string;
  themeIds?: number[];
  languageIds?: number[];
}

export interface UpdateProfilePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
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

export interface SortInfo {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface PageableInfo {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: SortInfo;
  unpaged: boolean;
}

export interface TranslatorCallHistoryItem {
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

export interface PaginatedTranslatorCallHistoryResponse {
  totalElements: number;
  totalPages: number;
  pageable: PageableInfo;
  size: number;
  content: TranslatorCallHistoryItem[];
  number: number;
  sort: SortInfo;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface GetTranslatorCallHistoryParams {
  isMissed?: boolean;
  isLast?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface TranslatorStatusResponse {
  translatorId: number;
  isOnline: boolean;
}

export interface CurrentUserProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  balance: number;
  hasDepositRequest: boolean;
}

export const getTranslatorThemes = async (
  params: GetTranslatorThemesParams = {},
): Promise<PaginatedTranslatorThemesResponse> => {
  const response = await api.get("/translator/themes", { params });
  return response.data;
};

export const getActiveLanguages = async (): Promise<TranslatorLanguage[]> => {
  const response = await api.get("/api/languages");
  return response.data;
};

export const uploadAvatar = async (
  file: File,
): Promise<UploadedAvatarResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/profile/avatar/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const fillTranslatorProfile = async (
  payload: FillTranslatorProfileRequest,
): Promise<TranslatorProfileResponse> => {
  const response = await api.put("/translator", payload);
  return response.data;
};

export const patchTranslatorProfile = async (
  payload: PatchTranslatorProfileRequest,
): Promise<TranslatorProfileResponse> => {
  const response = await api.patch("/translator", payload);
  return response.data;
};

export const deleteAvatar = async (): Promise<void> => {
  await api.delete("/profile/avatar/delete");
};

export const updateProfilePassword = async (
  payload: UpdateProfilePasswordPayload,
): Promise<void> => {
  await api.post("/profile/password/update", payload);
};

export const getCurrentUserBalance = async (): Promise<number> => {
  const response = await api.get("/profile/balance");
  return response.data;
};

export const switchTranslatorStatus =
  async (): Promise<TranslatorStatusResponse> => {
    const response = await api.put("/translator/switch-status");
    return response.data;
  };

export const getTranslatorCallHistory = async (
  params: GetTranslatorCallHistoryParams = {},
): Promise<PaginatedTranslatorCallHistoryResponse> => {
  const response = await api.get("/profile/calls/history", { params });
  return response.data;
};

export const getUnreadNotificationsCount = async (): Promise<number> => {
  const response = await api.get("/profile/notifications/count", {
    params: { isUnread: true },
  });
  return response.data;
};

export const getCurrentUserProfile =
  async (): Promise<CurrentUserProfileResponse> => {
    const response = await api.get("/me");
    return response.data;
  };

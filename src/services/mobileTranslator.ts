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

export const fillTranslatorProfile = async (
  payload: FillTranslatorProfileRequest,
): Promise<TranslatorProfileResponse> => {
  const response = await api.put<TranslatorProfileResponse>(
    "/translator",
    payload,
  );
  return response.data;
};

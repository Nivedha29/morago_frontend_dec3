import api from "./api";

export interface ThemeItem {
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

export interface ThemeListResponse {
  content: ThemeItem[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface GetAdminThemesParams {
  isActive?: boolean;
  keyword?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface CreateThemePayload {
  name: string;
  title: string;
  titleEn: string;
  titleRu: string;
  description: string;
  descriptionEn: string;
  descriptionRu: string;
  isActive: boolean;
  categoryId: number;
  isPopular: boolean;
}

export const getAdminThemes = async (
  params?: GetAdminThemesParams,
): Promise<ThemeListResponse> => {
  const response = await api.get(ADMIN_THEMES_BASE, {
    params,
  });

  return response.data;
};

export const getAdminThemeById = async (id: number): Promise<ThemeItem> => {
  const response = await api.get(`${ADMIN_THEMES_BASE}/${id}`);
  return response.data;
};

export const createAdminTheme = async (
  payload: CreateThemePayload,
): Promise<ThemeItem> => {
  const response = await api.post(ADMIN_THEMES_BASE, payload);
  return response.data;
};

export const uploadAdminThemeIcon = async (
  themeId: number,
  file: File,
): Promise<ThemeItem> => {
  const formData = new FormData();
  formData.append("icon", file);

  const response = await api.post(
    `${ADMIN_THEMES_BASE}/${themeId}/icon`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

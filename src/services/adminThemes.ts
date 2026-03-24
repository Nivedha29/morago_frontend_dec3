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
  page: number;
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

export const getAdminThemes = async (
  params: GetAdminThemesParams = {},
): Promise<ThemeListResponse> => {
  const response = await api.get("/admin/themes", {
    params: {
      page: 0,
      size: 10,
      sortBy: "id",
      sortDirection: "ASC",
      ...params,
    },
  });

  return response.data;
};

export const getAdminThemeById = async (id: number): Promise<ThemeItem> => {
  const response = await api.get(`/admin/themes/${id}`);
  return response.data;
};

///////////////////////////////////////////////////////////
// Create Themes
///////////////////////////////////////////////////////////

export interface CreateThemePayload {
  name: string;
  title: string;
  titleEn: string;
  titleRu: string;
  description: string;
  descriptionEn: string;
  descriptionRu: string;
  price: number;
  nightPrice: number;
  isPopular: boolean;
  isActive: boolean;
  iconId: number;
  categoryId: number;
}

export const createAdminTheme = async (
  payload: CreateThemePayload,
): Promise<ThemeItem> => {
  const response = await api.post("/admin/themes", payload);
  return response.data;
};

///////////////////////////////////////////////////////////
// Uploading File
///////////////////////////////////////////////////////////

export interface UploadFileResponse {
  id: number;
  name?: string;
  url?: string;
}

export const uploadAdminFile = async (
  file: File,
): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/admin/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

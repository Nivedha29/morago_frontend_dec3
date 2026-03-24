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
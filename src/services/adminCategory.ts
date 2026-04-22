import api from "./api";

const ADMIN_CATEGORIES_BASE = "/admin/categories";

export interface CategoryItem {
  id: number;
  name: string;
  isActive: boolean;
}

export interface CategoryListResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: CategoryItem[];
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface GetAdminCategoriesParams {
  isActive?: boolean;
  keyword?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface CategoryDetailResponse {
  id: number;
  name: string;
  isActive: boolean;
}

export interface CreateCategoryPayload {
  name: string;
}

export const getAdminCategories = async (
  params?: GetAdminCategoriesParams,
): Promise<CategoryListResponse> => {
  const response = await api.get<CategoryListResponse>(ADMIN_CATEGORIES_BASE, {
    params,
  });

  return response.data;
};

export const getAdminCategoryById = async (
  id: number,
): Promise<CategoryDetailResponse> => {
  const response = await api.get<CategoryDetailResponse>(
    `${ADMIN_CATEGORIES_BASE}/${id}`,
  );

  return response.data;
};

export const createAdminCategory = async (
  payload: CreateCategoryPayload,
): Promise<CategoryDetailResponse> => {
  const response = await api.post<CategoryDetailResponse>(
    ADMIN_CATEGORIES_BASE,
    payload,
  );

  return response.data;
};

import api from "./api";

///////////////////////////////////////////////////////////
// Categories
///////////////////////////////////////////////////////////

const ADMIN_CATEGORIES_BASE = "/admin/categories";

export interface CategoryItem {
  id: number;
  name: string;
  isActive: boolean;
}

export interface CategoryListResponse {
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: number;
  content: CategoryItem[];
}

export interface GetAdminCategoriesParams {
  keyword?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

<<<<<<< HEAD
export interface CategoryDetailResponse {
  id: number;
  name: string;
  isActive: boolean;
}

<<<<<<< HEAD
export interface CategoryDetailResponse {
  id: number;
  name: string;
  isActive: boolean;
}

export const getAdminCategories = async (
  params?: GetAdminCategoriesParams,
): Promise<CategoryListResponse> => {
  const response = await api.get<CategoryListResponse>(ADMIN_CATEGORIES_BASE, {
=======
export const getAdminCategories = async (
  params?: GetAdminCategoriesParams,
): Promise<CategoryListResponse> => {
  const response = await api.get(ADMIN_CATEGORIES_BASE, {
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)
    params,
  });

  return response.data;
};
<<<<<<< HEAD

export const getAdminCategoryById = async (
  id: number,
): Promise<CategoryDetailResponse> => {
  const response = await api.get<CategoryDetailResponse>(
    `${ADMIN_CATEGORIES_BASE}/${id}`,
  );

  return response.data;
};
=======
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)

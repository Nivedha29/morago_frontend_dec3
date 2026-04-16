import api from "./api";

<<<<<<< HEAD
///////////////////////////////////////////////////////////
// Categories
///////////////////////////////////////////////////////////

=======
>>>>>>> fb1069c (feat: implement admin categories page with table, controls, and API integration)
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
<<<<<<< HEAD
=======
export const getAdminCategories = async (
  params?: GetAdminCategoriesParams,
): Promise<CategoryListResponse> => {
  const response = await api.get(ADMIN_CATEGORIES_BASE, {
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)
=======
>>>>>>> fb1069c (feat: implement admin categories page with table, controls, and API integration)
    params,
  });

  return response.data;
};
<<<<<<< HEAD
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
=======
>>>>>>> fb1069c (feat: implement admin categories page with table, controls, and API integration)

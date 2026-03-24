import api from "./api";

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

export const getAdminCategories = async (
  params: GetAdminCategoriesParams = {},
): Promise<CategoryListResponse> => {
  const response = await api.get("/admin/categories", {
    params: {
      page: 0,
      size: 5,
      sortBy: "id",
      sortDirection: "ASC",
      ...params,
    },
  });

  return response.data;
};

export interface CategoryDetailResponse {
  id: number;
  name: string;
  isActive: boolean;
}

export const getAdminCategoryById = async (
  id: number,
): Promise<CategoryDetailResponse> => {
  const response = await api.get(`/admin/categories/${id}`);
  return response.data;
};

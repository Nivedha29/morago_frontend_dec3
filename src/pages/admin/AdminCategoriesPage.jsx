import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable, {
  defaultCategoryColumns,
} from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import "../../styles/AdminLayout.css";
import {
  getAdminCategories,
  getAdminCategoryById,
} from "../../services/adminCategory";
import CategoryDetailModal from "../../components/admin/CategoryDetailModal";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenCategoryDetail = async (category) => {
    try {
      setIsDetailModalOpen(true);
      setDetailLoading(true);
      setDetailError("");
      setSelectedCategory(null);

      const data = await getAdminCategoryById(category.id);
      setSelectedCategory(data);
    } catch (error) {
      console.error("Failed to fetch category detail:", error);
      setDetailError(error.message || "Failed to fetch category details");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseCategoryDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedCategory(null);
    setDetailError("");
    setDetailLoading(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminCategories({ page });

        setCategories(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError(error.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page]);

  const categoryColumns = defaultCategoryColumns((category) => {
    handleOpenCategoryDetail(category);
  });

  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Categories"
            breadcrumbSection="Translation topics"
            breadcrumbPage="Categories"
          >
            {loading && <p>Loading categories...</p>}

            {!loading && error && <p>{error}</p>}

            {!loading && !error && categories.length === 0 && (
              <p>No categories found.</p>
            )}

            {!loading && !error && categories.length > 0 && (
              <div className="admin-table categories-table">
                <AdminTable data={categories} columns={categoryColumns} />
              </div>
            )}

            <div className="admin-page-footer">
              <AdminPagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
            {isDetailModalOpen && (
              <CategoryDetailModal
                category={selectedCategory}
                loading={detailLoading}
                error={detailError}
                onClose={handleCloseCategoryDetail}
              />
            )}
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryPage;

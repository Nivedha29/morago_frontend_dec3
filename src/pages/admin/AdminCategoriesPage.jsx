import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable, {
  defaultCategoryColumns,
} from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import "../../styles/AdminLayout.css";
import { getAdminCategories } from "../../services/adminCategory";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
    console.log("Open category detail:", category.id);
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
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryPage;

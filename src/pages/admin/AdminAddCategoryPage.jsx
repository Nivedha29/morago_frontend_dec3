import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import "../../styles/AdminLayout.css";
import "../../styles/AdminAddCategoryPage.css";
import { createAdminCategory } from "../../services/adminCategory";

const AdminAddCategoryPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");

      await createAdminCategory({
        name: name.trim(),
        isActive,
      });

      navigate("/admin/categories");
    } catch (error) {
      console.error("Failed to create category:", error);

      const backendMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "";

      if (
        backendMessage.toLowerCase().includes("duplicate") ||
        backendMessage.toLowerCase().includes("categories.name")
      ) {
        setError("Category name already exists.");
      } else {
        setError("Failed to create category.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/categories");
  };

  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Category"
            breadcrumbSection="Translation topics"
            breadcrumbPage="Add Category"
            showControls={false}
          >
            <div className="admin-add-category-card">
              <div className="admin-add-category-banner">
                <div className="admin-add-category-image" />
                <div className="admin-add-category-preview" />
              </div>

              <div className="admin-add-category-form">
                <label
                  htmlFor="category-name"
                  className="admin-add-category-label"
                >
                  Category name
                </label>

                <input
                  id="category-name"
                  type="text"
                  className="admin-add-category-input"
                  placeholder="Category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                {error && <p className="admin-add-category-error">{error}</p>}
              </div>
            </div>

            <div className="admin-add-category-actions">
              <button
                type="button"
                className="admin-add-category-cancel"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-add-category-save"
                onClick={handleSave}
                disabled={loading || !name.trim()}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCategoryPage;

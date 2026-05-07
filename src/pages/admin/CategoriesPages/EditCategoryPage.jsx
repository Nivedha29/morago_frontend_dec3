import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import {
  getAdminCategoryById,
  updateAdminCategory,
} from "../../../services/adminCategory";
import "../../../styles/Admin/CategoryPages/AddCategoryPage.css";

const EditCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      setErrorMessage("");

      try {
        setIsLoading(true);

        const category = await getAdminCategoryById(Number(id));

        setName(category.name || "");
        setIsActive(Boolean(category.isActive));
      } catch (apiError) {
        console.error("Failed to fetch category:", apiError);

        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to fetch category";

        setErrorMessage(backendMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Category name is required");
      return;
    }

    try {
      setIsSubmitting(true);

      await updateAdminCategory(Number(id), {
        name: name.trim(),
        isActive,
      });

      navigate("/admin/categories");
    } catch (apiError) {
      console.error("Failed to update category:", apiError);

      const backendMessage =
        apiError?.message ||
        apiError?.details?.error ||
        apiError?.details?.message ||
        "Failed to update category";

      if (
        backendMessage.toLowerCase().includes("duplicate") ||
        backendMessage.toLowerCase().includes("categories.name")
      ) {
        setErrorMessage("Category name already exists.");
      } else {
        setErrorMessage(backendMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <AdminPageShell
        title="Edit Category"
        showControls={false}
        breadcrumbs={[
          { label: "Translation topics" },
          { label: "Categories", path: "/admin/categories" },
          { label: "Edit Category" },
        ]}
      >
        <div className="add-category-page">
          <div className="add-category-card">
            <form className="add-category-form" onSubmit={handleSaveCategory}>
              <div className="add-category-field">
                <label htmlFor="category-name" className="add-category-label">
                  Category name
                </label>
                <input
                  id="category-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="add-category-input"
                  placeholder="Category name"
                  aria-label="Category name"
                  disabled={isLoading}
                />
              </div>

              <div className="add-category-field">
                <label htmlFor="category-status" className="add-category-label">
                  Status
                </label>
                <select
                  id="category-status"
                  value={isActive ? "active" : "inactive"}
                  onChange={(e) => setIsActive(e.target.value === "active")}
                  className="add-category-input"
                  aria-label="Category status"
                  disabled={isLoading}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {errorMessage && (
                <p className="add-category-error-message">{errorMessage}</p>
              )}

              <div className="add-category-actions">
                <button
                  type="button"
                  className="add-category-cancel-btn"
                  onClick={() => navigate("/admin/categories")}
                  aria-label="Cancel edit category"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-category-save-btn"
                  aria-label="Save category changes"
                  disabled={isLoading || isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
};

export default EditCategoryPage;

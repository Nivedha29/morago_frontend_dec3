import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import { createAdminCategory } from "../../../services/adminCategory";
import "../../../styles/Admin/CategoryPages/AddCategoryPage.css";

const AddCategoryPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Category name is required");
      return;
    }

    try {
      setIsSubmitting(true);

      await createAdminCategory({
        name: name.trim(),
      });

      navigate("/admin/categories");
    } catch (apiError) {
      console.error("Failed to create category:", apiError);

      const backendMessage =
        apiError?.message ||
        apiError?.details?.error ||
        apiError?.details?.message ||
        "Failed to create category";

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
        title="Add Category"
        showControls={false}
        breadcrumbs={[
          { label: "Translation topics" },
          { label: "Categories", path: "/admin/categories" },
          { label: "Add Category" },
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
                />
              </div>

              {errorMessage && (
                <p className="add-category-error-message">{errorMessage}</p>
              )}

              <div className="add-category-actions">
                <button
                  type="button"
                  className="add-category-cancel-btn"
                  onClick={() => navigate("/admin/categories")}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-category-save-btn"
                  disabled={isSubmitting}
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

export default AddCategoryPage;

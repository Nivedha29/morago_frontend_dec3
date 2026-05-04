import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import {
  getAdminThemeById,
  updateAdminTheme,
  uploadAdminThemeIcon,
} from "../../../services/adminThemes";
import { getAdminCategories } from "../../../services/adminCategory";
import "../../../styles/Admin/ThemesPages/AddThemePage.css";

const EditThemePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    titleEn: "",
    titleRu: "",
    description: "",
    descriptionEn: "",
    descriptionRu: "",
    price: "",
    nightPrice: "",
    categoryId: "",
    isPopular: false,
    isActive: true,
    iconId: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setErrorMessage("");

        const [theme, categoriesRes] = await Promise.all([
          getAdminThemeById(Number(id)),
          getAdminCategories({
            page: 0,
            size: 50,
            sortBy: "id",
            sortDirection: "ASC",
          }),
        ]);

        setFormData({
          name: theme.name || "",
          title: theme.title || "",
          titleEn: theme.titleEn || "",
          titleRu: theme.titleRu || "",
          description: theme.description || "",
          descriptionEn: theme.descriptionEn || "",
          descriptionRu: theme.descriptionRu || "",
          price: theme.price || "",
          nightPrice: theme.nightPrice || "",
          categoryId: theme.categoryId || "",
          isPopular: theme.isPopular,
          isActive: theme.isActive,
          iconId: theme.iconId || 0,
        });

        setPreviewImage(theme.iconUrl || "");
        setCategories(categoriesRes.content || []);
      } catch (apiError) {
        console.error("Failed to load theme:", apiError);

        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to load theme";

        setErrorMessage(backendMessage);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setIsSubmitting(true);

      const updated = await updateAdminTheme(Number(id), {
        ...formData,
        price: Number(formData.price),
        nightPrice: Number(formData.nightPrice),
        categoryId: Number(formData.categoryId),
      });

      if (selectedFile) {
        await uploadAdminThemeIcon(updated.id, selectedFile);
      }

      navigate("/admin/themes");
    } catch (apiError) {
      console.error("Failed to update theme:", apiError);

      const backendMessage =
        apiError?.message ||
        apiError?.details?.error ||
        apiError?.details?.message ||
        "Failed to update theme";

      setErrorMessage(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <AdminPageShell
        title="Edit Theme"
        showControls={false}
        breadcrumbs={[
          { label: "Lists" },
          { label: "Themes", path: "/admin/themes" },
          { label: "Edit Theme" },
        ]}
      >
        <div className="morago-add-theme-page">
          <div className="morago-add-theme-card">
            <form className="morago-add-theme-form" onSubmit={handleSubmit}>
              <div className="morago-add-theme-upload-section">
                <label className="morago-add-theme-label">Theme Icon</label>

                <div
                  className="morago-add-theme-upload-box"
                  onClick={openFilePicker}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload theme icon"
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Theme preview"
                      className="morago-add-theme-preview-image"
                    />
                  ) : (
                    <span className="morago-add-theme-upload-placeholder">
                      Upload icon
                    </span>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="morago-add-theme-hidden-input"
                  onChange={handleFileChange}
                />
              </div>

              <div className="morago-add-theme-field">
                <label className="morago-add-theme-label">Theme Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="morago-add-theme-input"
                  aria-label="Theme name"
                />
              </div>

              <div className="morago-add-theme-field">
                <label className="morago-add-theme-label">Category</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="morago-add-theme-input"
                  aria-label="Theme category"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="morago-add-theme-row">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="morago-add-theme-input"
                  placeholder="Title"
                />
                <input
                  name="titleEn"
                  value={formData.titleEn}
                  onChange={handleChange}
                  className="morago-add-theme-input"
                  placeholder="Title EN"
                />
                <input
                  name="titleRu"
                  value={formData.titleRu}
                  onChange={handleChange}
                  className="morago-add-theme-input"
                  placeholder="Title RU"
                />
              </div>

              <div className="morago-add-theme-row">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="morago-add-theme-textarea"
                  placeholder="Description"
                />
                <textarea
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={handleChange}
                  className="morago-add-theme-textarea"
                  placeholder="Description EN"
                />
                <textarea
                  name="descriptionRu"
                  value={formData.descriptionRu}
                  onChange={handleChange}
                  className="morago-add-theme-textarea"
                  placeholder="Description RU"
                />
              </div>

              <div className="morago-add-theme-row">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="morago-add-theme-input"
                  placeholder="Price"
                />
                <input
                  type="number"
                  name="nightPrice"
                  value={formData.nightPrice}
                  onChange={handleChange}
                  className="morago-add-theme-input"
                  placeholder="Night Price"
                />

                <div className="morago-add-theme-options-field">
                  <label>
                    <input
                      type="checkbox"
                      name="isPopular"
                      checked={formData.isPopular}
                      onChange={handleChange}
                    />
                    Popular
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                    />
                    Active
                  </label>
                </div>
              </div>

              {errorMessage && (
                <p className="morago-add-theme-error-message">{errorMessage}</p>
              )}

              <div className="morago-add-theme-actions">
                <button
                  type="button"
                  className="morago-add-theme-cancel-btn"
                  onClick={() => navigate("/admin/themes")}
                  aria-label="Cancel edit theme"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="morago-add-theme-save-btn"
                  aria-label="Save theme changes"
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

export default EditThemePage;

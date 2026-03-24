import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import {
  createAdminTheme,
  getAdminCategories,
  uploadAdminThemeIcon,
} from "../../services/adminThemes";
import "../../styles/AdminLayout.css";
import "../../styles/AddThemePage.css";

const AddThemePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
    isPopular: false,
    isActive: true,
    categoryId: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setError("");

        const data = await getAdminCategories({
          page: 0,
          size: 50,
          sortBy: "id",
          sortDirection: "ASC",
        });

        setCategories(data.content || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError(err.message || "Failed to load categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setError("Theme name is required.");
      return;
    }

    if (!formData.categoryId) {
      setError("Category is required.");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    if (!formData.nightPrice || Number(formData.nightPrice) <= 0) {
      setError("Night price must be greater than 0.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const createdTheme = await createAdminTheme({
        name: formData.name,
        title: formData.title || formData.name,
        titleEn: formData.titleEn || formData.name,
        titleRu: formData.titleRu || formData.name,
        description: formData.description || "",
        descriptionEn: formData.descriptionEn || "",
        descriptionRu: formData.descriptionRu || "",
        price: Number(formData.price),
        nightPrice: Number(formData.nightPrice),
        isPopular: formData.isPopular,
        isActive: formData.isActive,
        iconId: 0,
        categoryId: Number(formData.categoryId),
      });

      if (selectedFile) {
        await uploadAdminThemeIcon(createdTheme.id, selectedFile);
      }

      navigate("/admin/themes");
    } catch (err) {
      console.error("Failed to create theme:", err);
      setError(err.message || "Failed to create theme.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Themes"
            breadcrumbSection="Translation topics"
            breadcrumbPage="Themes / Add Theme"
          >
            <div className="add-theme-card">
              <div className="add-theme-upload-row">
                <div
                  className="add-theme-upload-box"
                  onClick={handleOpenFilePicker}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleOpenFilePicker();
                    }
                  }}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Theme preview"
                      className="add-theme-preview-image"
                    />
                  ) : (
                    <span className="add-theme-upload-icon">⇧</span>
                  )}
                </div>

                <div className="add-theme-upload-placeholder" />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="add-theme-hidden-input"
                onChange={handleImageChange}
              />

              <div className="add-theme-form-grid">
                <div className="add-theme-field">
                  <label className="add-theme-label">Themes name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="add-theme-input"
                    placeholder="Themes name"
                  />
                </div>

                <div className="add-theme-field add-theme-category-field">
                  <label className="add-theme-label">Categories</label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="add-theme-input"
                    disabled={loadingCategories}
                  >
                    <option value="">
                      {loadingCategories ? "Loading..." : "Choose..."}
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="add-theme-row-three">
                  <div className="add-theme-field">
                    <label className="add-theme-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="add-theme-input"
                      placeholder="Default title"
                    />
                  </div>

                  <div className="add-theme-field">
                    <label className="add-theme-label">Title EN</label>
                    <input
                      type="text"
                      name="titleEn"
                      value={formData.titleEn}
                      onChange={handleChange}
                      className="add-theme-input"
                      placeholder="English title"
                    />
                  </div>

                  <div className="add-theme-field">
                    <label className="add-theme-label">Title RU</label>
                    <input
                      type="text"
                      name="titleRu"
                      value={formData.titleRu}
                      onChange={handleChange}
                      className="add-theme-input"
                      placeholder="Russian title"
                    />
                  </div>
                </div>

                <div className="add-theme-row-three">
                  <div className="add-theme-field">
                    <label className="add-theme-label">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="add-theme-textarea"
                      placeholder="Default description"
                    />
                  </div>

                  <div className="add-theme-field">
                    <label className="add-theme-label">Description EN</label>
                    <textarea
                      name="descriptionEn"
                      value={formData.descriptionEn}
                      onChange={handleChange}
                      className="add-theme-textarea"
                      placeholder="English description"
                    />
                  </div>

                  <div className="add-theme-field">
                    <label className="add-theme-label">Description RU</label>
                    <textarea
                      name="descriptionRu"
                      value={formData.descriptionRu}
                      onChange={handleChange}
                      className="add-theme-textarea"
                      placeholder="Russian description"
                    />
                  </div>
                </div>

                <div className="add-theme-row-three">
                  <div className="add-theme-field">
                    <label className="add-theme-label">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="add-theme-input"
                      placeholder="15000"
                    />
                  </div>

                  <div className="add-theme-field">
                    <label className="add-theme-label">Night Price</label>
                    <input
                      type="number"
                      name="nightPrice"
                      value={formData.nightPrice}
                      onChange={handleChange}
                      className="add-theme-input"
                      placeholder="18000"
                    />
                  </div>

                  <div className="add-theme-field add-theme-flags-field">
                    <label className="add-theme-label">Options</label>

                    <label className="add-theme-flag-option">
                      <input
                        type="checkbox"
                        name="isPopular"
                        checked={formData.isPopular}
                        onChange={handleChange}
                      />
                      <span>Popular</span>
                    </label>

                    <label className="add-theme-flag-option">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                      />
                      <span>Active</span>
                    </label>
                  </div>
                </div>
              </div>

              {error && <p className="add-theme-error-text">{error}</p>}
            </div>

            <div className="add-theme-actions">
              <button
                type="button"
                className="add-theme-cancel-btn"
                onClick={() => navigate(-1)}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="button"
                className="add-theme-save-btn"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AddThemePage;
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
  const [errors, setErrors] = useState({});

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
      } catch (error) {
        console.error(error);

        const message = error?.response?.data?.error || error?.message;

        if (message && message.toLowerCase().includes("duplicate")) {
          setError("Theme name already exists.");
        } else {
          setError("Failed to create theme. Please try again.");
        }
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

    setErrors((prev) => ({
      ...prev,
      icon: "",
    }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedFile) {
      newErrors.icon = "Field is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Field is required";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Field is required";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Field is required";
    }

    if (!formData.titleEn.trim()) {
      newErrors.titleEn = "Field is required";
    }

    if (!formData.titleRu.trim()) {
      newErrors.titleRu = "Field is required";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Field is required";
    }

    if (!formData.nightPrice || Number(formData.nightPrice) <= 0) {
      newErrors.nightPrice = "Field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const createdTheme = await createAdminTheme({
        name: formData.name,
        title: formData.title,
        titleEn: formData.titleEn,
        titleRu: formData.titleRu,
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
    } catch (error) {
      console.error(error);

      const message = error?.response?.data?.error || error?.message;

      if (message && message.toLowerCase().includes("duplicate")) {
        setError("Theme name already exists.");
      } else {
        setError("Failed to create theme. Please try again.");
      }
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

              <p className="add-theme-helper-text">
                Icon file will be uploaded after the theme is created.
              </p>
              {errors.icon && (
                <p className="add-theme-field-error">{errors.icon}</p>
              )}

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
                  {errors.name && (
                    <p className="add-theme-field-error">{errors.name}</p>
                  )}
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
                  {errors.categoryId && (
                    <p className="add-theme-field-error">{errors.categoryId}</p>
                  )}
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
                    {errors.title && (
                      <p className="add-theme-field-error">{errors.title}</p>
                    )}
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
                    {errors.titleEn && (
                      <p className="add-theme-field-error">{errors.titleEn}</p>
                    )}
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
                    {errors.titleRu && (
                      <p className="add-theme-field-error">{errors.titleRu}</p>
                    )}
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
                    {errors.price && (
                      <p className="add-theme-field-error">{errors.price}</p>
                    )}
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
                    {errors.nightPrice && (
                      <p className="add-theme-field-error">
                        {errors.nightPrice}
                      </p>
                    )}
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

              {error && <div className="admin-form-error">{error}</div>}
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

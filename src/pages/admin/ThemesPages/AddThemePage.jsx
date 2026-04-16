import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import {
  createAdminTheme,
  uploadAdminThemeIcon,
} from "../../../services/adminThemes";
import { getAdminCategories } from "../../../services/adminCategory";
import "../../../styles/Admin/ThemesPages/AddThemePage.css";

const AddThemePage = () => {
  const navigate = useNavigate();
  const moragoAddThemeFileInputRef = useRef(null);

  const [moragoAddThemeCategories, setMoragoAddThemeCategories] = useState([]);
  const [moragoAddThemeSelectedFile, setMoragoAddThemeSelectedFile] =
    useState(null);
  const [moragoAddThemePreviewImage, setMoragoAddThemePreviewImage] =
    useState("");

  const [moragoAddThemeLoadingCategories, setMoragoAddThemeLoadingCategories] =
    useState(true);
  const [moragoAddThemeIsSubmitting, setMoragoAddThemeIsSubmitting] =
    useState(false);
  const [moragoAddThemeErrorMessage, setMoragoAddThemeErrorMessage] =
    useState("");
  const [moragoAddThemeFieldErrors, setMoragoAddThemeFieldErrors] = useState(
    {},
  );

  const [moragoAddThemeFormData, setMoragoAddThemeFormData] = useState({
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
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setMoragoAddThemeLoadingCategories(true);
        setMoragoAddThemeErrorMessage("");

        const data = await getAdminCategories({
          page: 0,
          size: 50,
          sortBy: "id",
          sortDirection: "ASC",
        });

        setMoragoAddThemeCategories(data.content || []);
      } catch (apiError) {
        console.error("Failed to fetch categories:", apiError);

        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to load categories";

        setMoragoAddThemeErrorMessage(backendMessage);
      } finally {
        setMoragoAddThemeLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleMoragoAddThemeOpenFilePicker = () => {
    moragoAddThemeFileInputRef.current?.click();
  };

  const handleMoragoAddThemeImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setMoragoAddThemeSelectedFile(file);
    setMoragoAddThemePreviewImage(URL.createObjectURL(file));

    setMoragoAddThemeFieldErrors((prev) => ({
      ...prev,
      icon: "",
    }));
  };

  const handleMoragoAddThemeInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setMoragoAddThemeFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMoragoAddThemeFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (moragoAddThemeErrorMessage) {
      setMoragoAddThemeErrorMessage("");
    }
  };

  const getMoragoAddThemePrettyErrorMessage = (apiError) => {
    const rawMessage =
      apiError?.message ||
      apiError?.details?.error ||
      apiError?.details?.message ||
      "Failed to create theme";

    const normalizedMessage = String(rawMessage).toLowerCase();

    if (
      normalizedMessage.includes("night_price cannot be null") ||
      normalizedMessage.includes("night price cannot be null")
    ) {
      return "Night Price is required.";
    }

    if (
      normalizedMessage.includes("price cannot be null") &&
      !normalizedMessage.includes("night_price")
    ) {
      return "Price is required.";
    }

    if (normalizedMessage.includes("duplicate")) {
      return "Theme name already exists.";
    }

    if (
      normalizedMessage.includes("category") &&
      normalizedMessage.includes("null")
    ) {
      return "Category is required.";
    }

    if (
      normalizedMessage.includes("name") &&
      normalizedMessage.includes("null")
    ) {
      return "Theme Name is required.";
    }

    return "Unable to save theme. Please check the required fields and try again.";
  };

  const validateMoragoAddThemeForm = () => {
    const newErrors = {};

    if (!moragoAddThemeSelectedFile) {
      newErrors.icon = "Icon is required";
    }

    if (!moragoAddThemeFormData.name.trim()) {
      newErrors.name = "Theme Name is required";
    }

    if (!moragoAddThemeFormData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    if (!moragoAddThemeFormData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!moragoAddThemeFormData.titleEn.trim()) {
      newErrors.titleEn = "Title EN is required";
    }

    if (!moragoAddThemeFormData.titleRu.trim()) {
      newErrors.titleRu = "Title RU is required";
    }

    if (
      !moragoAddThemeFormData.price ||
      Number(moragoAddThemeFormData.price) <= 0
    ) {
      newErrors.price = "Price is required";
    }

    if (
      !moragoAddThemeFormData.nightPrice ||
      Number(moragoAddThemeFormData.nightPrice) <= 0
    ) {
      newErrors.nightPrice = "Night Price is required";
    }

    setMoragoAddThemeFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMoragoAddThemeSave = async (event) => {
    event.preventDefault();
    setMoragoAddThemeErrorMessage("");

    if (!validateMoragoAddThemeForm()) {
      return;
    }

    try {
      setMoragoAddThemeIsSubmitting(true);

      const createdTheme = await createAdminTheme({
        name: moragoAddThemeFormData.name.trim(),
        title: moragoAddThemeFormData.title.trim(),
        titleEn: moragoAddThemeFormData.titleEn.trim(),
        titleRu: moragoAddThemeFormData.titleRu.trim(),
        description: moragoAddThemeFormData.description.trim(),
        descriptionEn: moragoAddThemeFormData.descriptionEn.trim(),
        descriptionRu: moragoAddThemeFormData.descriptionRu.trim(),
        price: Number(moragoAddThemeFormData.price),
        nightPrice: Number(moragoAddThemeFormData.nightPrice),
        categoryId: Number(moragoAddThemeFormData.categoryId),
        isPopular: moragoAddThemeFormData.isPopular,
        isActive: moragoAddThemeFormData.isActive,
      });

      if (moragoAddThemeSelectedFile) {
        await uploadAdminThemeIcon(createdTheme.id, moragoAddThemeSelectedFile);
      }

      navigate("/admin/themes");
    } catch (apiError) {
      console.error("Failed to create theme:", apiError);
      setMoragoAddThemeErrorMessage(
        getMoragoAddThemePrettyErrorMessage(apiError),
      );
    } finally {
      setMoragoAddThemeIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <AdminPageShell
        title="Add Theme"
        showControls={false}
        breadcrumbs={[
          { label: "Translation topics" },
          { label: "Themes", path: "/admin/themes" },
          { label: "Add Theme" },
        ]}
      >
        <div className="morago-add-theme-page">
          <div className="morago-add-theme-card">
            <form
              className="morago-add-theme-form"
              onSubmit={handleMoragoAddThemeSave}
            >
              <div className="morago-add-theme-upload-section">
                <label className="morago-add-theme-label">Theme Icon</label>

                <div
                  className="morago-add-theme-upload-box"
                  onClick={handleMoragoAddThemeOpenFilePicker}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      handleMoragoAddThemeOpenFilePicker();
                    }
                  }}
                >
                  {moragoAddThemePreviewImage ? (
                    <img
                      src={moragoAddThemePreviewImage}
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
                  ref={moragoAddThemeFileInputRef}
                  type="file"
                  accept="image/*"
                  className="morago-add-theme-hidden-input"
                  onChange={handleMoragoAddThemeImageChange}
                />

                {moragoAddThemeFieldErrors.icon && (
                  <p className="morago-add-theme-field-error">
                    {moragoAddThemeFieldErrors.icon}
                  </p>
                )}
              </div>

              <div className="morago-add-theme-field">
                <label className="morago-add-theme-label">Theme Name</label>
                <input
                  type="text"
                  name="name"
                  value={moragoAddThemeFormData.name}
                  onChange={handleMoragoAddThemeInputChange}
                  className="morago-add-theme-input"
                  placeholder="Enter theme name"
                />
                {moragoAddThemeFieldErrors.name && (
                  <p className="morago-add-theme-field-error">
                    {moragoAddThemeFieldErrors.name}
                  </p>
                )}
              </div>

              <div className="morago-add-theme-field">
                <label className="morago-add-theme-label">Category</label>
                <select
                  name="categoryId"
                  value={moragoAddThemeFormData.categoryId}
                  onChange={handleMoragoAddThemeInputChange}
                  className="morago-add-theme-input"
                  disabled={moragoAddThemeLoadingCategories}
                >
                  <option value="">
                    {moragoAddThemeLoadingCategories
                      ? "Loading categories..."
                      : "Select category"}
                  </option>
                  {moragoAddThemeCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {moragoAddThemeFieldErrors.categoryId && (
                  <p className="morago-add-theme-field-error">
                    {moragoAddThemeFieldErrors.categoryId}
                  </p>
                )}
              </div>

              <div className="morago-add-theme-row">
                <div className="morago-add-theme-field">
                  <label className="morago-add-theme-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={moragoAddThemeFormData.title}
                    onChange={handleMoragoAddThemeInputChange}
                    className="morago-add-theme-input"
                    placeholder="Enter default title"
                  />
                  {moragoAddThemeFieldErrors.title && (
                    <p className="morago-add-theme-field-error">
                      {moragoAddThemeFieldErrors.title}
                    </p>
                  )}
                </div>

                <div className="morago-add-theme-field">
                  <label className="morago-add-theme-label">Title EN</label>
                  <input
                    type="text"
                    name="titleEn"
                    value={moragoAddThemeFormData.titleEn}
                    onChange={handleMoragoAddThemeInputChange}
                    className="morago-add-theme-input"
                    placeholder="Enter English title"
                  />
                  {moragoAddThemeFieldErrors.titleEn && (
                    <p className="morago-add-theme-field-error">
                      {moragoAddThemeFieldErrors.titleEn}
                    </p>
                  )}
                </div>

                <div className="morago-add-theme-field">
                  <label className="morago-add-theme-label">Title RU</label>
                  <input
                    type="text"
                    name="titleRu"
                    value={moragoAddThemeFormData.titleRu}
                    onChange={handleMoragoAddThemeInputChange}
                    className="morago-add-theme-input"
                    placeholder="Enter Russian title"
                  />
                  {moragoAddThemeFieldErrors.titleRu && (
                    <p className="morago-add-theme-field-error">
                      {moragoAddThemeFieldErrors.titleRu}
                    </p>
                  )}
                </div>
              </div>

              <div className="morago-add-theme-row">
                <div className="morago-add-theme-field">
                  <label className="morago-add-theme-label">Description</label>
                  <textarea
                    name="description"
                    value={moragoAddThemeFormData.description}
                    onChange={handleMoragoAddThemeInputChange}
                    className="morago-add-theme-textarea"
                    placeholder="Enter default description"
                  />
                </div>

                <div className="morago-add-theme-field">
                  <label className="morago-add-theme-label">
                    Description EN
                  </label>
                  <textarea
                    name="descriptionEn"
                    value={moragoAddThemeFormData.descriptionEn}
                    onChange={handleMoragoAddThemeInputChange}
                    className="morago-add-theme-textarea"
                    placeholder="Enter English description"
                  />
                </div>

                <div className="morago-add-theme-field">
                  <label className="morago-add-theme-label">
                    Description RU
                  </label>
                  <textarea
                    name="descriptionRu"
                    value={moragoAddThemeFormData.descriptionRu}
                    onChange={handleMoragoAddThemeInputChange}
                    className="morago-add-theme-textarea"
                    placeholder="Enter Russian description"
                  />
                </div>
              </div>

              <div className="morago-add-theme-row">
                <div className="morago-add-theme-field">
                  <label className="morago-add-theme-label">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={moragoAddThemeFormData.price}
                    onChange={handleMoragoAddThemeInputChange}
                    className="morago-add-theme-input"
                    placeholder="Enter price"
                  />
                  {moragoAddThemeFieldErrors.price && (
                    <p className="morago-add-theme-field-error">
                      {moragoAddThemeFieldErrors.price}
                    </p>
                  )}
                </div>

                <div className="morago-add-theme-field">
                  <label className="morago-add-theme-label">Night Price</label>
                  <input
                    type="number"
                    name="nightPrice"
                    value={moragoAddThemeFormData.nightPrice}
                    onChange={handleMoragoAddThemeInputChange}
                    className="morago-add-theme-input"
                    placeholder="Enter night price"
                  />
                  {moragoAddThemeFieldErrors.nightPrice && (
                    <p className="morago-add-theme-field-error">
                      {moragoAddThemeFieldErrors.nightPrice}
                    </p>
                  )}
                </div>

                <div className="morago-add-theme-options-field">
                  <label className="morago-add-theme-label">Options</label>

                  <label className="morago-add-theme-checkbox-option">
                    <input
                      type="checkbox"
                      name="isPopular"
                      checked={moragoAddThemeFormData.isPopular}
                      onChange={handleMoragoAddThemeInputChange}
                    />
                    <span>Popular</span>
                  </label>

                  <label className="morago-add-theme-checkbox-option">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={moragoAddThemeFormData.isActive}
                      onChange={handleMoragoAddThemeInputChange}
                    />
                    <span>Active</span>
                  </label>
                </div>
              </div>

              {moragoAddThemeErrorMessage && (
                <p className="morago-add-theme-error-message">
                  {moragoAddThemeErrorMessage}
                </p>
              )}

              <div className="morago-add-theme-actions">
                <button
                  type="button"
                  className="morago-add-theme-cancel-btn"
                  onClick={() => navigate("/admin/themes")}
                  disabled={moragoAddThemeIsSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="morago-add-theme-save-btn"
                  disabled={moragoAddThemeIsSubmitting}
                >
                  {moragoAddThemeIsSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
};

export default AddThemePage;

import React, { useEffect } from "react";
import defaultAvatar from "../../assets/avatar.svg";
import "../../styles/Admin/CategoryPages/CategoryDetailModal.css";

const CategoryDetailModal = ({
  category,
  loading,
  error,
  onClose,
  onDelete,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleDelete = async () => {
    if (!category?.id) return;

    const confirmed = window.confirm(
      "Are you sure you want to deactivate this category?",
    );
    if (!confirmed) return;

    await onDelete(category.id);
    onClose();
  };

  if (!loading && !error && !category) return null;

  return (
    <div
      className="category-detail-modal-overlay"
      onClick={onClose}
      aria-label="Close category modal overlay"
    >
      <div
        className="category-detail-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Category details modal"
      >
        <button
          type="button"
          className="category-detail-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="category-detail-modal-body">
          <div className="category-detail-modal-top">
            <div className="category-detail-modal-image-wrapper">
              <img
                alt="Category image"
                className="category-detail-modal-image"
                src={category?.imageUrl || defaultAvatar}
                onError={(e) => {
                  e.currentTarget.src = defaultAvatar;
                }}
              />
            </div>

            <div className="category-detail-modal-actions">
              <button
                type="button"
                className="category-detail-modal-edit-btn"
                aria-label="Edit category"
              >
                Edit <span>→</span>
              </button>

              <button
                type="button"
                className="category-detail-modal-delete-btn"
                onClick={handleDelete}
                aria-label="Deactivate category"
                disabled={!category?.isActive}
              >
                Deactivate
              </button>
            </div>
          </div>

          {loading && (
            <p className="category-detail-modal-state">
              Loading category details...
            </p>
          )}

          {!loading && error && (
            <p className="category-detail-modal-state category-detail-modal-error">
              {error}
            </p>
          )}

          {!loading && !error && category && (
            <div className="category-detail-modal-content">
              <div className="category-detail-modal-name-block">
                <span className="category-detail-modal-name">
                  {category.name || "-"}
                </span>
              </div>

              <div className="category-detail-modal-status-block">
                <span className="category-detail-modal-label">Status:</span>
                <span className="category-detail-modal-value">
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailModal;

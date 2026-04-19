import React, { useEffect } from "react";
import "../../styles/Admin/CategoryPages/CategoryDetailModal.css";

const CategoryDetailModal = ({ category, loading, error, onClose }) => {
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

  if (!loading && !error && !category) return null;

  return (
    <div className="category-detail-modal-overlay" onClick={onClose}>
      <div
        className="category-detail-modal"
        onClick={(e) => e.stopPropagation()}
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
            <div className="category-detail-modal-image" />

            <div className="category-detail-modal-actions">
              <button type="button" className="category-detail-modal-edit-btn">
                Edit <span>→</span>
              </button>

              <button
                type="button"
                className="category-detail-modal-status-btn"
              >
                Status <span className="category-detail-modal-gear">⚙</span>
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

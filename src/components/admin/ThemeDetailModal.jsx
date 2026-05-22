import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/avatar.svg";
import "../../styles/Admin/ThemesPages/ThemeDetailModal.css";

const ThemeDetailModal = ({ theme, loading, error, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!theme && !loading && !error) return null;

  const categoryName = theme?.categoryName || "-";

  const handleEditTheme = () => {
    if (!theme?.id) return;

    onClose();
    navigate(`/admin/themes/edit/${theme.id}`);
  };

  return (
    <div className="morago-theme-detail-modal__overlay" onClick={onClose}>
      <div
        className="morago-theme-detail-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="morago-theme-detail-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {loading ? (
          <p className="morago-theme-detail-modal__state">Loading...</p>
        ) : error ? (
          <p className="morago-theme-detail-modal__state morago-theme-detail-modal__state--error">
            {error}
          </p>
        ) : (
          <>
            <div className="morago-theme-detail-modal__top">
              <div className="morago-theme-detail-modal__image-wrap">
                <img
                  src={theme?.iconUrl || defaultAvatar}
                  alt={theme?.title || theme?.name}
                  className="morago-theme-detail-modal__image"
                  onError={(e) => {
                    e.currentTarget.src = defaultAvatar;
                  }}
                />
              </div>

              <div className="morago-theme-detail-modal__banner" />

              <div className="morago-theme-detail-modal__actions">
                <button
                  type="button"
                  className="morago-theme-detail-modal__action-btn"
                  onClick={handleEditTheme}
                  aria-label="Edit theme"
                  disabled={!theme?.id}
                >
                  Edit <span>→</span>
                </button>
              </div>
            </div>

            <div className="morago-theme-detail-modal__info">
              <div className="morago-theme-detail-modal__info-left">
                <p className="morago-theme-detail-modal__label">Theme name</p>
                <p className="morago-theme-detail-modal__value">
                  {theme?.title || theme?.name || "-"}
                </p>
              </div>

              <div className="morago-theme-detail-modal__info-right">
                <div className="morago-theme-detail-modal__info-block">
                  <p className="morago-theme-detail-modal__label">Category:</p>
                  <p className="morago-theme-detail-modal__subvalue">
                    {categoryName}
                  </p>
                </div>

                <div className="morago-theme-detail-modal__info-block">
                  <p className="morago-theme-detail-modal__label">Status:</p>
                  <p className="morago-theme-detail-modal__subvalue">
                    {theme?.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ThemeDetailModal;

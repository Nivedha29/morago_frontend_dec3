import React from "react";
import eyeIcon from "../../assets/eye.svg";
import "../../styles/Admin/ThemesPages/ThemeDetailModal.css"

const ThemeDetailModal = ({ theme, loading, error, onClose }) => {
  if (!theme && !loading && !error) return null;

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
                {theme?.iconUrl ? (
                  <img
                    src={theme.iconUrl}
                    alt={theme.title || theme.name}
                    className="morago-theme-detail-modal__image"
                  />
                ) : (
                  <div className="morago-theme-detail-modal__image-placeholder">
                    <img
                      src={eyeIcon}
                      alt="theme"
                      className="morago-theme-detail-modal__placeholder-icon"
                    />
                  </div>
                )}
              </div>

              <div className="morago-theme-detail-modal__banner" />

              <div className="morago-theme-detail-modal__actions">
                <button
                  type="button"
                  className="morago-theme-detail-modal__action-btn"
                >
                  Edit <span>→</span>
                </button>

                <button
                  type="button"
                  className="morago-theme-detail-modal__action-btn"
                >
                  Status <span>⚙</span>
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
                    {theme?.categoryId ?? "-"}
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

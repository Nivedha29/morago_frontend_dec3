import React from "react";
import "../../styles/ThemeDetailModal.css";
import eyeIcon from "../../assets/eye.svg";

const ThemeDetailModal = ({ theme, loading, error, onClose }) => {
  if (!theme && !loading && !error) return null;

  return (
    <div className="theme-modal-overlay" onClick={onClose}>
      <div className="theme-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="theme-modal-close" onClick={onClose}>
          ×
        </button>

        {loading ? (
          <p className="theme-modal-state">Loading...</p>
        ) : error ? (
          <p className="theme-modal-state error">{error}</p>
        ) : (
          <>
            <div className="theme-modal-top">
              <div className="theme-modal-image-wrap">
                {theme?.iconUrl ? (
                  <img
                    src={theme.iconUrl}
                    alt={theme.title || theme.name}
                    className="theme-modal-image"
                  />
                ) : (
                  <div className="theme-modal-image-placeholder">
                    <img
                      src={eyeIcon}
                      alt="theme"
                      className="theme-modal-placeholder-icon"
                    />
                  </div>
                )}
              </div>

              <div className="theme-modal-banner" />

              <div className="theme-modal-actions">
                <button type="button" className="theme-modal-action-btn">
                  Edit <span>→</span>
                </button>

                <button type="button" className="theme-modal-action-btn">
                  Status <span>⚙</span>
                </button>
              </div>
            </div>

            <div className="theme-modal-info">
              <div className="theme-modal-info-left">
                <p className="theme-modal-label">Theme name</p>
                <p className="theme-modal-value">
                  {theme?.title || theme?.name || "-"}
                </p>
              </div>

              <div className="theme-modal-info-right">
                <div className="theme-modal-info-block">
                  <p className="theme-modal-label">Category:</p>
                  <p className="theme-modal-subvalue">
                    {theme?.categoryId ?? "-"}
                  </p>
                </div>

                <div className="theme-modal-info-block">
                  <p className="theme-modal-label">Status:</p>
                  <p className="theme-modal-subvalue">
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

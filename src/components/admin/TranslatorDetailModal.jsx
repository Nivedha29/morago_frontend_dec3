import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/avatar.svg";
import "../../styles/Admin/TranslatorPages/TranslatorDetailModal.css";

const TranslatorDetailModal = ({ translator, onClose, onToggleActive }) => {
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

  if (!translator) return null;

  const isActive = translator.isActive;

  return (
    <div className="translator-modal-overlay" onClick={onClose}>
      <div className="translator-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="translator-modal-close"
          onClick={onClose}
          aria-label="Close translator detail modal"
        >
          ×
        </button>

        <div className="translator-modal-body">
          <div className="translator-modal-top">
            <img
              alt="Translator avatar"
              className="translator-modal-avatar"
              src={defaultAvatar}
            />

            <div className="translator-modal-actions">
              <button
                type="button"
                className="translator-modal-btn"
                onClick={() =>
                  navigate(`/admin/translators/${translator.id}/edit`)
                }
                aria-label="Edit translator account"
              >
                <span>Edit account</span>
                <span className="translator-modal-btn-arrow">→</span>
              </button>

              <button
                type="button"
                className={`translator-modal-btn ${
                  isActive
                    ? "translator-modal-btn-delete"
                    : "translator-modal-btn-activate"
                }`}
                onClick={() => onToggleActive(translator.id, isActive)}
                aria-label={
                  isActive
                    ? "Deactivate translator account"
                    : "Activate translator account"
                }
              >
                {isActive ? "Deactivate account" : "Activate account"}
              </button>
            </div>
          </div>

          <h3 className="translator-modal-name">
            {translator.firstName || translator.lastName
              ? `${translator.firstName || ""} ${
                  translator.lastName || ""
                }`.trim()
              : "-"}
          </h3>

          <div className="translator-modal-grid">
            <div>
              <p className="translator-modal-section-title">Translations:</p>
              <p className="translator-modal-text">
                {translator.themes && translator.themes.length > 0
                  ? translator.themes
                      .map(
                        (theme) => theme.titleEn || theme.title || theme.name,
                      )
                      .join(", ")
                  : "-"}
              </p>

              <p className="translator-modal-section-title">Language:</p>
              <p className="translator-modal-text">
                {translator.languages && translator.languages.length > 0
                  ? translator.languages
                      .map((language) => language.titleEn || language.name)
                      .join(", ")
                  : "-"}
              </p>
            </div>

            <div>
              <p>
                <strong>Phone:</strong> {translator.phone || "-"}
              </p>
              <p>
                <strong>Email:</strong> {translator.email || "-"}
              </p>
              <p>
                <strong>TOPIK:</strong>{" "}
                {translator.levelOfKorean
                  ? `Level ${translator.levelOfKorean}`
                  : "-"}
              </p>
              <p>
                <strong>Birth:</strong> {translator.dateOfBirth || "-"}
              </p>
              <p>
                <strong>Online:</strong>{" "}
                {translator.isOnline ? "Online" : "Offline"}
              </p>
              <p>
                <strong>Account:</strong> {isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorDetailModal;

import React from "react";
import statusIcon from "../../assets/SideBarGear.svg";
import defaultAvatar from "../../assets/avatar.svg";
import "../../styles/Admin/TranslatorPages/TranslatorDetailModal.css"

const TranslatorDetailModal = ({ translator, onClose }) => {
  if (!translator) return null;

  return (
    <div className="translator-modal-overlay" onClick={onClose}>
      <div className="translator-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="translator-modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="translator-modal-body">
          <div className="translator-modal-top">
            <img
              alt="avatar"
              className="translator-modal-avatar"
              src={defaultAvatar}
            />

            <div className="translator-modal-actions">
              <button type="button" className="translator-modal-btn">
                <span>Edit account</span>
                <span className="translator-modal-btn-arrow">→</span>
              </button>

              <button type="button" className="translator-modal-btn">
                Status
                <img
                  src={statusIcon}
                  alt="status"
                  className="translator-modal-btn-icon"
                />
              </button>
            </div>
          </div>

          <h3 className="translator-modal-name">
            {translator.firstName || translator.lastName
              ? `${translator.firstName || ""} ${translator.lastName || ""}`.trim()
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
                <strong>Status:</strong>{" "}
                {translator.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorDetailModal;

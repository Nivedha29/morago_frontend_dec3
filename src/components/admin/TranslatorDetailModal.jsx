import React from "react";
import "../../styles/TranslatorDetailModal.css";

const TranslatorDetailModal = ({ translator, onClose }) => {
  if (!translator) return null;

  return (
    <div className="translator-modal-overlay" onClick={onClose}>
      <div
        className="translator-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="translator-modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="translator-modal-title">Translator Details</h2>

        <div className="translator-modal-content">
          <div className="translator-modal-row">
            <span className="translator-modal-label">Name</span>
            <span className="translator-modal-value">
              {translator.firstName || translator.lastName
                ? `${translator.firstName || ""} ${translator.lastName || ""}`.trim()
                : "-"}
            </span>
          </div>

          <div className="translator-modal-row">
            <span className="translator-modal-label">Phone</span>
            <span className="translator-modal-value">
              {translator.phone || "-"}
            </span>
          </div>

          <div className="translator-modal-row">
            <span className="translator-modal-label">Email</span>
            <span className="translator-modal-value">
              {translator.email || "-"}
            </span>
          </div>

          <div className="translator-modal-row">
            <span className="translator-modal-label">Topik</span>
            <span className="translator-modal-value">
              {translator.levelOfKorean
                ? `${translator.levelOfKorean} level`
                : "-"}
            </span>
          </div>

          <div className="translator-modal-row">
            <span className="translator-modal-label">Status</span>
            <span className="translator-modal-value">
              {translator.isOnline ? "Online" : "Offline"}
            </span>
          </div>

          <div className="translator-modal-row">
            <span className="translator-modal-label">Withdraw request</span>
            <span className="translator-modal-value">
              {translator.hasWithdrawalRequest ? "Request" : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorDetailModal;
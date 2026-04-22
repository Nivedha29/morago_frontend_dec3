import React from "react";
import "../styles/SuccessModal.css";

const SuccessModal = ({ title, subtitle, buttonText, onButtonClick }) => {
  return (
    <div className="success-modal">
      <div className="success-modal__top-dim" />
      <div className="success-modal__handle" />

      <div className="success-modal__panel">
        <div className="success-modal__graphic">
          <div className="success-modal__check">✓</div>

          <div className="success-modal__avatar-wrap">
            <div className="success-modal__avatar-circle">
              <span className="success-modal__avatar-icon">👤</span>
            </div>
            <div className="success-modal__avatar-line" />
          </div>
        </div>

        <h1 className="success-modal__title">{title}</h1>

        <p className="success-modal__subtitle">{subtitle}</p>

        <button
          type="button"
          className="btn success-modal__button"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;

import React from "react";

import "../styles/SuccessModal.css";

const SuccessModal = ({ title, subtitle, buttonText, onButtonClick }) => {
  return (
    <div
      className="success-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-subtitle"
    >
      <div className="success-modal__top-dim" />
      <div className="success-modal__handle" />

      <div className="success-modal__panel">
        <div className="success-modal__graphic" aria-hidden="true">
          <div className="success-modal__check">✓</div>

          <div className="success-modal__avatar-wrap">
            <div className="success-modal__avatar-circle">
              <span className="success-modal__avatar-icon">👤</span>
            </div>
            <div className="success-modal__avatar-line" />
          </div>
        </div>

        <h1 id="success-modal-title" className="success-modal__title">
          {title}
        </h1>

        <p id="success-modal-subtitle" className="success-modal__subtitle">
          {subtitle}
        </p>

        <button
          type="button"
          className="btn success-modal__button"
          onClick={onButtonClick}
          aria-label={buttonText}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;

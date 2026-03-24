import React from "react";
import "../../styles/UserDetailModal.css";

const UserDetailModal = ({ user, loading, error, onClose }) => {
  if (!loading && !error && !user) return null;

  return (
    <div className="user-detail-modal-overlay" onClick={onClose}>
      <div className="user-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="user-detail-modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="user-detail-modal-top">
          <div className="user-detail-modal-avatar" />

          <button type="button" className="user-detail-modal-edit-btn">
            Edit account <span>→</span>
          </button>
        </div>

        {loading && (
          <p className="user-detail-modal-state">Loading user details...</p>
        )}

        {!loading && error && (
          <p className="user-detail-modal-state user-detail-modal-error">
            {error}
          </p>
        )}

        {!loading && !error && user && (
          <div className="user-detail-modal-content">
            <div className="user-detail-modal-left">
              <h2 className="user-detail-modal-name">
                {user.firstName} {user.lastName}
              </h2>
            </div>

            <div className="user-detail-modal-right">
              <div className="user-detail-modal-field">
                <span className="user-detail-modal-label">Phone:</span>
                <span className="user-detail-modal-value">
                  {user.phone || "-"}
                </span>
              </div>

              <div className="user-detail-modal-field">
                <span className="user-detail-modal-label">Coins:</span>
                <span className="user-detail-modal-value">
                  {user.balance ?? 0}
                </span>
              </div>

              <div className="user-detail-modal-field">
                <span className="user-detail-modal-label">
                  Deposit request:
                </span>
                <span className="user-detail-modal-value">
                  {user.hasDepositRequest ? "Yes" : "No"}
                </span>
              </div>

              <button type="button" className="user-detail-modal-charge-btn">
                <span className="user-detail-modal-charge-icon">$</span>
                Charge <span>›</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailModal;

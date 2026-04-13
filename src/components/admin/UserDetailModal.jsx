import React from "react";
import defaultAvatar from "../../assets/avatar.svg";
import "../../styles/Admin/UserPages/UserDetailModal.css";

const UserDetailModal = ({ user, loading, error, onClose }) => {
  if (!loading && !error && !user) return null;

  return (
    <div className="user-modal-overlay" onClick={onClose}>
      <div className="user-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="user-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="user-modal-body">
          <div className="user-modal-top">
            <img
              alt="avatar"
              className="user-modal-avatar"
              src={defaultAvatar}
            />

            <div className="user-modal-actions">
              <button type="button" className="user-modal-btn">
                <span>Edit account</span>
                <span className="user-modal-btn-arrow">→</span>
              </button>
            </div>
          </div>

          {loading && (
            <p className="user-modal-state">Loading user details...</p>
          )}

          {!loading && error && (
            <p className="user-modal-state user-modal-error">{error}</p>
          )}

          {!loading && !error && user && (
            <div className="user-modal-info">
              <div className="user-modal-left">
                <h3 className="user-modal-name">
                  {user.firstName || user.lastName
                    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                    : "-"}
                </h3>
              </div>

              <div className="user-modal-right">
                <p>
                  <strong>Phone:</strong> {user.phone || "-"}
                </p>

                <p>
                  <strong>Deposit Request:</strong>{" "}
                  {user.hasDepositRequest ? "Yes" : "No"}
                </p>

                <p>
                  <strong>Coins:</strong> {user.balance ?? 0}
                </p>

                <button type="button" className="user-modal-charge-btn">
                  <span className="user-modal-charge-icon">$</span>
                  Charge <span>›</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;

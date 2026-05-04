import React, { useEffect } from "react";
import defaultAvatar from "../../assets/avatar.svg";
import "../../styles/Admin/UserPages/UserDetailModal.css";

const UserDetailModal = ({ user, loading, error, onClose, onDelete }) => {
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

  const handleDelete = async () => {
    if (!user?.id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (!confirmed) return;

    await onDelete(user.id);
    onClose();
  };

  if (!loading && !error && !user) return null;

  return (
    <div
      className="user-modal-overlay"
      onClick={onClose}
      aria-label="Close user modal overlay"
    >
      <div
        className="user-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="User details modal"
      >
        <button
          type="button"
          className="user-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="user-modal-body">
          <div className="user-modal-top">
            <img
              alt="User avatar"
              className="user-modal-avatar"
              src={user?.imageUrl || defaultAvatar}
              onError={(e) => {
                e.currentTarget.src = defaultAvatar;
              }}
            />

            <div className="user-modal-actions">
              <button
                type="button"
                className="user-modal-btn"
                aria-label="Edit user account"
              >
                <span>Edit account</span>
                <span className="user-modal-btn-arrow">→</span>
              </button>

              <button
                type="button"
                className="user-modal-btn user-modal-btn--danger"
                onClick={handleDelete}
                aria-label="Delete user"
              >
                <span>Delete user</span>
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

                <button
                  type="button"
                  className="user-modal-charge-btn"
                  aria-label="Charge user balance"
                >
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

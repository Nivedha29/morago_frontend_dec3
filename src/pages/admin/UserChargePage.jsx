import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { approveAdminUserDeposit } from "../../services/adminUser";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import "../../styles/AdminLayout.css";
import "../../styles/UserChargePage.css";

const UserChargePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, depositId } = useParams();

  const selectedUserName = location.state?.userName || "User";
  const initialAmount = location.state?.amount || "";

  const [sum, setSum] = useState(initialAmount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmDeposit = async () => {
    try {
      setLoading(true);
      setError("");

      await approveAdminUserDeposit(Number(depositId), {
        sum: Number(sum),
      });

      navigate(`/admin/users/${userId}/deposit-history`, {
        state: {
          userName: selectedUserName,
        },
      });
    } catch (err) {
      setError(err?.message || "Failed to approve deposit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Charge"
            breadcrumbSection="Lists"
            breadcrumbPage="Users / Add User"
          >
            <div className="user-charge-card">
              <div className="user-charge-form">
                <label className="user-charge-label">
                  User
                  <input
                    type="text"
                    value={selectedUserName}
                    readOnly
                    className="user-charge-input"
                  />
                </label>

                <label className="user-charge-label">
                  Phone
                  <input
                    type="text"
                    value="None"
                    readOnly
                    className="user-charge-input"
                  />
                </label>

                <label className="user-charge-label">
                  Label
                  <span className="user-charge-help">
                    If the amount is incorrect, specify an arbitrary amount.
                  </span>
                  <input
                    type="number"
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                    className="user-charge-input"
                  />
                </label>

                {error && <p className="user-charge-error">{error}</p>}
              </div>
            </div>

            <div className="user-charge-actions">
              <button
                type="button"
                className="user-charge-back-btn"
                onClick={() => navigate(-1)}
              >
                Back
              </button>

              <button
                type="button"
                className="user-charge-confirm-btn"
                onClick={handleConfirmDeposit}
                disabled={loading}
              >
                {loading ? "Processing..." : "Deposit Confirm"}
              </button>
            </div>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default UserChargePage;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  approveAdminUserDeposit,
  getAdminUserById,
} from "../../../services/adminUser";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import "../../../styles/Admin/UserPages/UserChargePage.css";

const UserChargePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, depositId } = useParams();

  const selectedUserName = location.state?.userName || "User";
  const initialAmount =
    location.state?.amount !== undefined && location.state?.amount !== null
      ? String(location.state.amount)
      : "";
  const [phone, setPhone] = useState(location.state?.phone || "");

  const backPath = userId
    ? `/admin/users/${userId}/deposit-history`
    : "/admin/users";

  const isInvalidAccess =
    !userId ||
    Number.isNaN(Number(userId)) ||
    !depositId ||
    Number.isNaN(Number(depositId)) ||
    location.state?.amount === undefined;

  const [sum, setSum] = useState(initialAmount);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isInvalidAccess) {
      navigate("/admin/users");
    }
  }, [isInvalidAccess, navigate]);

  useEffect(() => {
    const fetchUserPhone = async () => {
      if (phone || !userId || Number.isNaN(Number(userId))) return;

      try {
        const userData = await getAdminUserById(Number(userId));
        setPhone(userData?.phone || "-");
      } catch (apiError) {
        console.error("Failed to fetch user phone:", apiError);
        setPhone("-");
      }
    };

    fetchUserPhone();
  }, [phone, userId]);

  const handleApproveDeposit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (isInvalidAccess) {
      navigate("/admin/users");
      return;
    }

    if (!sum) {
      setErrorMessage("Deposit amount is required");
      return;
    }

    if (Number(sum) <= 0) {
      setErrorMessage("Deposit amount must be greater than 0");
      return;
    }

    try {
      setIsSubmitting(true);

      await approveAdminUserDeposit(Number(depositId), {
        sum: Number(sum),
      });

      navigate(backPath, {
        state: {
          userName: selectedUserName,
        },
      });
    } catch (apiError) {
      console.error("Failed to approve deposit:", apiError);

      const backendMessage =
        apiError?.message ||
        apiError?.details?.error ||
        apiError?.details?.message ||
        "Failed to approve deposit";

      setErrorMessage(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isInvalidAccess) {
    return (
      <AdminLayout>
        <AdminPageShell
          title="Charge"
          breadcrumbSection="Lists"
          breadcrumbPage="Users / Deposit history"
          showControls={false}
        >
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">
              Invalid access. Please return to Users page.
            </div>
          </div>
        </AdminPageShell>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageShell
        title={`Charge ${selectedUserName}`}
        breadcrumbSection="Lists"
        breadcrumbPage="Users / Deposit history"
        showControls={false}
      >
        <div className="user-charge-page">
          <div className="user-charge-card">
            <form className="user-charge-form" onSubmit={handleApproveDeposit}>
              <div className="user-charge-field">
                <label>User</label>
                <input type="text" value={selectedUserName} readOnly />
              </div>

              <div className="user-charge-field">
                <label>Phone</label>
                <input type="text" value={phone || "-"} readOnly />
              </div>

              <div className="user-charge-field">
                <label>Label</label>
                <span className="user-charge-help-text">
                  If the amount is incorrect, specify an arbitrary amount.
                </span>
                <input
                  type="number"
                  min="1"
                  value={sum}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "" || Number(value) >= 0) {
                      setSum(value);
                    }
                  }}
                />
              </div>

              {errorMessage && (
                <p className="user-charge-error-message">{errorMessage}</p>
              )}

              <div className="user-charge-actions">
                <button
                  type="button"
                  className="user-charge-btn-cancel"
                  onClick={() => navigate(backPath)}
                  disabled={isSubmitting}
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="user-charge-btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Deposit Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
};

export default UserChargePage;

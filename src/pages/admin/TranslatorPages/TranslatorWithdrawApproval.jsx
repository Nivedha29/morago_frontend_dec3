import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import "../../../styles/Admin/TranslatorPages/TranslatorWithdrawApproval.css";
import { approveWithdrawalById } from "../../../services/admin";

const TranslatorWithdrawApproval = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { translatorId, withdrawalId } = useParams();

  const withdrawal = location.state?.withdrawal || null;
  const translatorName = location.state?.translatorName || "";
  const backPath = `/admin/translators/${translatorId}/withdraw`;

  const [bankName, setBankName] = useState(withdrawal?.nameOfBank || "");
  const [bankAccount, setBankAccount] = useState(
    withdrawal?.accountNumber || "",
  );
  const [sum, setSum] = useState(withdrawal?.sum ? String(withdrawal.sum) : "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApproveWithdrawal = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!withdrawalId) {
      setErrorMessage("Withdrawal ID is missing");
      return;
    }

    if (!translatorName.trim()) {
      setErrorMessage("Translator name is missing");
      return;
    }

    if (!bankName.trim()) {
      setErrorMessage("Bank name is required");
      return;
    }

    if (!bankAccount.trim()) {
      setErrorMessage("Bank account is required");
      return;
    }

    if (!sum) {
      setErrorMessage("Withdrawal amount is required");
      return;
    }

    if (Number(sum) <= 0) {
      setErrorMessage("Withdrawal amount must be greater than 0");
      return;
    }

    try {
      setIsSubmitting(true);

      await approveWithdrawalById(Number(withdrawalId), {
        fullName: translatorName.trim(),
        bankName: bankName.trim(),
        bankAccount: bankAccount.trim(),
        sum: Number(sum),
      });

      navigate(backPath);
    } catch (apiError) {
      console.error("Failed to approve withdrawal:", apiError);

      const backendMessage =
        apiError?.message ||
        apiError?.details?.error ||
        apiError?.details?.message ||
        "Failed to approve withdrawal";

      setErrorMessage(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!withdrawal) {
      alert(
        "Withdrawal data is missing. Please access this page from Withdraw History.",
      );
      navigate(backPath);
    }
  }, [withdrawal, navigate, backPath]);

  const breadcrumbs = [
    { label: "Lists" },
    { label: "Translators", path: "/admin/translators" },
    {
      label: "Withdraw",
      path: `/admin/translators/${translatorId}/withdraw`,
    },
    { label: "Approval" },
  ];

  if (!withdrawal) {
    return (
      <AdminLayout>
        <AdminPageShell
          title="Withdraw Approval"
          showControls={false}
          breadcrumbs={breadcrumbs}
        >
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">Withdrawal data is missing</div>
          </div>
        </AdminPageShell>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageShell
        title="Withdraw Approval"
        showControls={false}
        breadcrumbs={breadcrumbs}
      >
        <div className="withdraw-approval-page">
          <div className="withdraw-approval-card">
            <form
              className="withdraw-approval-form"
              onSubmit={handleApproveWithdrawal}
            >
              <div className="withdraw-approval-field">
                <label>User Name</label>
                <input type="text" value={translatorName || "-"} readOnly />
              </div>

              <div className="withdraw-approval-field">
                <label>Withdrawal Owner</label>
                <input
                  type="text"
                  value={withdrawal?.accountHolder || ""}
                  readOnly
                />
              </div>

              <div className="withdraw-approval-field">
                <label>Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              <div className="withdraw-approval-field">
                <label>Bank Account</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                />
              </div>

              <div className="withdraw-approval-field">
                <label>Withdrawal Amount</label>
                <input
                  type="number"
                  value={sum}
                  onChange={(e) => setSum(e.target.value)}
                  min="1"
                />
              </div>

              {errorMessage && (
                <p className="withdraw-approval-error-message">
                  {errorMessage}
                </p>
              )}

              <div className="withdraw-approval-actions">
                <button
                  type="button"
                  className="withdraw-approval-btn-cancel"
                  onClick={() => navigate(backPath)}
                  disabled={isSubmitting}
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="withdraw-approval-btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Transfer completed"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
};

export default TranslatorWithdrawApproval;

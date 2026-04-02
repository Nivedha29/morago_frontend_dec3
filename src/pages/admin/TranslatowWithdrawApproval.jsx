import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageShell from "../../components/admin/AdminPageShell";
import "../../styles/TranslatorWithdrawApproval.css";
import { approveWithdrawalById } from "../../services/admin";

const TranslatorWithdrawApproval = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { translatorId, withdrawalId } = useParams();

  const withdrawal = location.state?.withdrawal;
  const translatorName = location.state?.translatorName || "";
  const backPath = `/admin/translators/${translatorId}/withdraw`;

  const [fullName, setFullName] = useState(translatorName);
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

    if (!fullName.trim() || !bankName.trim() || !bankAccount.trim() || !sum) {
      setErrorMessage("All fields are required");
      return;
    }

    if (Number(sum) <= 0) {
      setErrorMessage("Withdrawal amount must be greater than 0");
      return;
    }

    try {
      setIsSubmitting(true);

      await approveWithdrawalById(Number(withdrawalId), {
        fullName: fullName.trim(),
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

  return (
    <AdminLayout>
      <AdminPageShell
        title="Withdraw"
        breadcrumbSection="Lists"
        breadcrumbPage="Translators / Withdraw"
        showControls={false}
      >
        <div className="withdraw-page">
          <div className="withdraw-card">
            <form className="withdraw-form" onSubmit={handleApproveWithdrawal}>
              <div className="withdraw-field">
                <label>User Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="withdraw-field">
                <label>Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              <div className="withdraw-field">
                <label>Bank Account</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                />
              </div>

              <div className="withdraw-field">
                <label>Withdrawal Amount</label>
                <input
                  type="number"
                  value={sum}
                  onChange={(e) => setSum(e.target.value)}
                  min="1"
                />
              </div>

              {errorMessage && (
                <p className="withdraw-error-message">{errorMessage}</p>
              )}

              <div className="withdraw-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate(backPath)}
                  disabled={isSubmitting}
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="btn-submit"
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

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

  const [fullName, setFullName] = useState(withdrawal?.fullName || "");
  const [bankName, setBankName] = useState(withdrawal?.bankName || "");
  const [bankAccount, setBankAccount] = useState(withdrawal?.bankAccount || "");
  const [sum, setSum] = useState(withdrawal?.amount || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApproveWithdrawal = async (e) => {
    e.preventDefault();
    if (!withdrawalId) return;

    try {
      setIsSubmitting(true);

      await approveWithdrawalById(Number(withdrawalId), {
        fullName: fullName.trim(),
        bankName: bankName.trim(),
        bankAccount: bankAccount.trim(),
        sum: Number(sum),
      });

      navigate(`/admin/translators/${translatorId}/withdraw-history`);
    } catch (apiError) {
      console.error("Failed to approve withdrawal:", apiError);
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
                />
              </div>

              <div className="withdraw-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() =>
                    navigate(
                      `/admin/translators/${translatorId}/withdraw-history`,
                    )
                  }
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

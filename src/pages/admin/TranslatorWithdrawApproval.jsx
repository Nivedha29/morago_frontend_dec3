import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import "../../styles/AdminLayout.css";
<<<<<<< HEAD:src/pages/admin/TranslatorWithdrawPage.jsx
import "../../styles/TranslatorWithdrawPage.css";
/*import { approveWithdrawal } from "../../services/admin";*/
=======
import "../../styles/TranslatorWithdrawApproval.css";
<<<<<<< HEAD
<<<<<<< HEAD:src/pages/admin/TranslatowWithdrawApproval.jsx
import { approveWithdrawal } from "../../services/admin";
>>>>>>> b3f11f3 ( Feature : Added Skeleton and Initial Styling):src/pages/admin/TranslatowWithdrawApproval.jsx
=======

>>>>>>> d956887 (Admin: Add Withdraw Approval routing and navigation from Withdraw History table):src/pages/admin/TranslatorWithdrawApproval.jsx
=======
import { approveWithdrawalById } from "../../services/admin";
>>>>>>> 26a4d5a (Admin: Implement Withdraw History and Approval flow; add API integration and routing (blocked by missing withdrawal id from backend))

const TranslatorWithdrawApproval = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const withdrawal = location.state?.withdrawal;
  const { translatorId, withdrawalId } = useParams();
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
    } catch (error) {
      console.error("Failed to approve withdrawal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Withdraw"
            breadcrumbSection="Lists"
            breadcrumbPage="Translators / Withdraw"
            showControls={false}
          >
            <div className="withdraw-page">
              <div className="withdraw-card">
                <form
                  className="withdraw-form"
                  onSubmit={handleApproveWithdrawal}
                >
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
        </div>
      </div>
    </div>
  );
};

export default TranslatorWithdrawApproval;

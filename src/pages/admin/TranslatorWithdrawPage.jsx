import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import "../../styles/AdminLayout.css";
import "../../styles/TranslatorWithdrawPage.css";
/*import { approveWithdrawal } from "../../services/admin";*/

const TranslatorWithdrawPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [fullName, setFullName] = useState("Dmitrii Kim");
  const [bankName, setBankName] = useState("Hana Bank");
  const [bankAccount, setBankAccount] = useState("4400 9999 2313 23 05");
  const [sum, setSum] = useState("20000");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApproveWithdrawal = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await approveWithdrawal(Number(id), {
        fullName: fullName.trim(),
        bankName: bankName.trim(),
        bankAccount: bankAccount.trim(),
        sum: Number(sum),
      });

      navigate("/admin/translators");
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
                      onClick={() => navigate("/admin/translators")}
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

export default TranslatorWithdrawPage;
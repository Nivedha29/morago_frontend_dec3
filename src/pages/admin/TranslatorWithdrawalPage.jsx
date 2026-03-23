import React from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import "../../styles/AdminLayout.css";
import "../../styles/TranslatorWithdrawPage.css";

const TranslatorWithdrawPage = () => {
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
                <form className="withdraw-form">
                  <div className="withdraw-field">
                    <label>User Name</label>
                    <input type="text" value="Dmitrii Kim" disabled />
                  </div>

                  <div className="withdraw-field">
                    <label>Bank Name</label>
                    <input type="text" value="KEB Hana Bank" disabled />
                  </div>

                  <div className="withdraw-field">
                    <label>Bank Account</label>
                    <input type="text" value="4401 4200 1234 56 78" disabled />
                  </div>

                  <div className="withdraw-field">
                    <label>Withdrawal Amount</label>
                    <input type="text" value="300,000" disabled />
                  </div>

                  <div className="withdraw-actions">
                    <button type="button" className="btn-cancel">
                      Back
                    </button>

                    <button type="button" className="btn-submit">
                      Transfer completed
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

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageShell from "../../components/admin/AdminPageShell";
import "../../styles/TranslatorWithdrawPage.css";
import {
  getActiveWithdrawalByUserId,
  getTranslatorById,
} from "../../services/admin";

const TranslatorWithdrawApproval = () => {
  const navigate = useNavigate();
  const { translatorId } = useParams();

  const [withdrawal, setWithdrawal] = useState(null);
  const [translatorName, setTranslatorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWithdrawalData = async () => {
      if (!translatorId) return;

      try {
        setLoading(true);
        setError("");

        const [withdrawalData, translatorData] = await Promise.all([
          getActiveWithdrawalByUserId(Number(translatorId)),
          getTranslatorById(Number(translatorId)),
        ]);

        const fullName =
          `${translatorData.firstName || ""} ${translatorData.lastName || ""}`.trim();

        setWithdrawal(withdrawalData);
        setTranslatorName(fullName);
      } catch (apiError) {
        console.error("Failed to fetch withdrawal data:", apiError);

        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to fetch active withdrawal";

        setError(backendMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawalData();
  }, [translatorId]);

  return (
    <AdminLayout>
      <AdminPageShell
        title="Withdraw"
        breadcrumbSection="Lists"
        breadcrumbPage="Translators / Withdraw"
        showControls={false}
      >
        {loading && (
          <div className="withdraw-page-empty-state">Loading withdrawal...</div>
        )}

        {!loading && error && (
          <div className="withdraw-page-empty-state">{error}</div>
        )}

        {!loading && !error && !withdrawal && (
          <div className="withdraw-page-empty-state">
            No withdrawal history found
          </div>
        )}

        {!loading && !error && withdrawal && (
          <div className="withdraw-page">
            <div className="withdraw-page-card">
              <div className="withdraw-page-field">
                <label>User Name</label>
                <p>{translatorName || "-"}</p>
              </div>

              <div className="withdraw-page-field">
                <label>Account Holder</label>
                <p>{withdrawal.accountHolder || "-"}</p>
              </div>

              <div className="withdraw-page-field">
                <label>Bank Name</label>
                <p>{withdrawal.nameOfBank || "-"}</p>
              </div>

              <div className="withdraw-page-field">
                <label>Bank Account</label>
                <p>{withdrawal.accountNumber || "-"}</p>
              </div>

              <div className="withdraw-page-field">
                <label>Withdrawal Amount</label>
                <p>{withdrawal.sum ?? "-"}</p>
              </div>

              <div className="withdraw-page-field">
                <label>Status</label>
                <p>{withdrawal.status || "-"}</p>
              </div>

              <div className="withdraw-page-actions">
                <button
                  type="button"
                  className="withdraw-page-btn-cancel"
                  onClick={() => navigate("/admin/translators")}
                >
                  Back
                </button>

                <button
                  type="button"
                  className="withdraw-page-btn-submit"
                  onClick={() =>
                    navigate(
                      `/admin/translators/${translatorId}/withdraw/${withdrawal.id}/approval`,
                      {
                        state: {
                          withdrawal,
                          translatorName,
                        },
                      },
                    )
                  }
                >
                  Open approval
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminPageShell>
    </AdminLayout>
  );
};

export default TranslatorWithdrawPage;

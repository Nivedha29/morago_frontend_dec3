import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import AdminPagination from "../../../components/admin/AdminPagination";
import AdminTable from "../../../components/admin/AdminTable";
import "../../../styles/TranslatorWithdrawHistoryPage.css";
import { getWithdrawalHistoryByUserId } from "../../../services/admin";
import { translatorWithdrawHistoryColumns } from "../../../components/admin/DefaultTranslatorColumns";

const TranslatorWithdrawHistoryPage = () => {
  const { translatorId } = useParams();

  const [page, setPage] = useState(0);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchWithdrawalHistory = async () => {
      if (!translatorId) return;

      try {
        setLoading(true);
        setError("");

        const data = await getWithdrawalHistoryByUserId(Number(translatorId), {
          page,
          size: 5,
          sortBy: "id",
          sortDirection: "ASC",
        });

        setWithdrawals(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (apiError) {
        console.error("Failed to fetch withdrawal history:", apiError);

        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to fetch withdrawal history";

        setError(backendMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawalHistory();
  }, [translatorId, page]);

  const withdrawalColumns = translatorWithdrawHistoryColumns();

  return (
    <AdminLayout>
      <AdminPageShell
        title="Withdraw History"
        breadcrumbSection="Lists"
        breadcrumbPage="Translators / Withdraw history"
        showControls={false}
      >
        {loading && (
          <div className="translator-withdraw-empty-state">
            Loading withdrawal history...
          </div>
        )}

        {!loading && error && (
          <div className="translator-withdraw-empty-state">{error}</div>
        )}

        {!loading && !error && (
          <>
            <div className="translator-withdraw-table">
              <AdminTable
                data={withdrawals}
                columns={withdrawalColumns}
                tableClassName="admin-translator-withdraw-history-table"
              />
            </div>

            {withdrawals.length === 0 && (
              <div className="translator-withdraw-empty-state">
                No withdrawal history found
              </div>
            )}

            {totalPages > 0 && (
              <div className="admin-page-footer">
                <AdminPagination
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </>
        )}
      </AdminPageShell>
    </AdminLayout>
  );
};

export default TranslatorWithdrawHistoryPage;

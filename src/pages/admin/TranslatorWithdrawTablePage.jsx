<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminTable from "../../components/admin/AdminTable";
=======
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminTable from "../../components/admin/AdminTable";
import "../../styles/AdminLayout.css";
>>>>>>> 7f0ce96 ( Routing: Clicking View on Translotor Table routes to Withdraw History Page)
import "../../styles/TranslatorWithdrawTablePage.css";
import { getWithdrawalHistoryByUserId } from "../../services/admin";

const mockWithdrawHistory = [
  {
    id: 1,
    type: "Withdraw",
    date: "2022.12.27 17:43",
    coins: "- 300.000",
    request: "Transfer completed",
  },
  {
    id: 2,
    type: "Withdraw",
    date: "2022.12.31 20:43",
    coins: "- 40.000",
    request: "Transfer completed",
  },
];

const TranslatorWithdrawTablePage = () => {
  const navigate = useNavigate();
  const { translatorId } = useParams();
<<<<<<< HEAD

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

  const withdrawalColumns = [
    {
      key: "checkbox",
      header: <input type="checkbox" className="admin-table-checkbox" />,
      cellClassName: "admin-table-checkbox-cell",
      headerClassName: "admin-table-checkbox-cell",
      disableSortArrow: true,
      render: () => <input type="checkbox" className="admin-table-checkbox" />,
    },
    {
      key: "type",
      header: "Withdraw",
      render: () => "Withdraw",
    },
    {
      key: "date",
      header: "Date",
      render: (item) => item.date || "-",
    },
    {
      key: "amount",
      header: "Coins",
      render: (item) => item.amount ?? "-",
    },
    {
      key: "status",
      header: "Withdraw request",
      render: (item) => item.status || "-",
    },
  ];
=======
  const [page, setPage] = useState(0);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchWithdrawalHistory = async () => {
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
      } catch (error) {
        console.error("Failed to fetch withdrawal history:", error);
        setError(error.message || "Failed to fetch withdrawal history");
      } finally {
        setLoading(false);
      }
    };

    if (translatorId) {
      fetchWithdrawalHistory();
    }
  }, [translatorId, page]);

  const withdrawalColumns = [
    {
      key: "checkbox",
      header: <input type="checkbox" className="admin-table-checkbox" />,
      cellClassName: "admin-table-checkbox-cell",
      headerClassName: "admin-table-checkbox-cell",
      disableSortArrow: true,
      render: () => <input type="checkbox" className="admin-table-checkbox" />,
    },
    {
      key: "type",
      header: "Withdraw",
      render: () => "Withdraw",
    },
    {
      key: "date",
      header: "Date",
      render: (item) => item.date || "-",
    },
    {
      key: "amount",
      header: "Coins",
      render: (item) => item.amount ?? "-",
    },
    {
      key: "status",
      header: "Withdraw request",
      cellClassName: "admin-table-link",
      render: (item) => item.status || "-",
      onClick: (item) =>
        navigate(
          `/admin/translators/${translatorId}/withdraw-history/${item.id}/approval`,
        ),
    },
  ];

  return (
    <AdminLayout>
      <AdminPageShell
        title="Withdraw history"
        breadcrumbSection="Lists"
        breadcrumbPage="Translators / Withdraw history"
      >
        {loading && (
          <div className="withdraw-empty-state">
            Loading withdrawal history...
          </div>
        )}

        {!loading && error && (
          <div className="withdraw-empty-state">{error}</div>
        )}

<<<<<<< HEAD
        {!loading && !error && (
          <>
            <div className="translator-withdraw-table">
              <AdminTable data={withdrawals} columns={withdrawalColumns} />
            </div>

            {withdrawals.length === 0 && (
              <div className="withdraw-empty-state">
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
=======
        <div className="admin-page-content">
          <AdminPageShell
            title="Withdraw history"
            breadcrumbSection="Lists"
            breadcrumbPage="Translators / Withdraw history"
          >
            {loading && <p>Loading withdrawal history...</p>}

            {!loading && error && <p>{error}</p>}

            {!loading && !error && (
              <AdminTable data={withdrawals} columns={withdrawalColumns} />
            )}

            <div className="admin-page-footer">
              <AdminPagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>

            <p className="withdraw-debug">Translator ID: {translatorId}</p>
          </AdminPageShell>
        </div>
      </div>
    </div>
>>>>>>> 7f0ce96 ( Routing: Clicking View on Translotor Table routes to Withdraw History Page)
  );
};

export default TranslatorWithdrawTablePage;

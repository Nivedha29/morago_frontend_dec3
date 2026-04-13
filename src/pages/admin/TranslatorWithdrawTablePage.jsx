import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminTable from "../../components/admin/AdminTable";
import "../../styles/AdminLayout.css";
import "../../styles/TranslatorWithdrawTablePage.css";
import { getWithdrawalHistoryByUserId } from "../../services/admin";

const TranslatorWithdrawTablePage = () => {
  const navigate = useNavigate();
  const { translatorId } = useParams();
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
        console.log("withdrawal history response:", data);
        console.log("withdrawal content:", data.content);

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
      onClick: (item) => {
        console.log("clicked item:", item);

        if (!item?.id) {
          console.error("Withdrawal id is missing:", item);
          return;
        }

        navigate(
          `/admin/translators/${translatorId}/withdraw-history/${item.id}/approval`,
          {
            state: { withdrawal: item },
          },
        );
      },
    },
  ];

  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

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
  );
};

export default TranslatorWithdrawTablePage;

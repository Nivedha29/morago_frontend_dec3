import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAdminUserDepositHistory } from "../../services/adminUser";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminTable from "../../components/admin/AdminTable";
import "../../styles/AdminLayout.css";

const UserDepositHistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();

  const selectedUserName = location.state?.userName || "User";

  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDepositHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminUserDepositHistory({
          userId: Number(userId),
          page,
          size: 5,
        });

        setDeposits(data.content || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err?.message || "Failed to load deposit history.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDepositHistory();
    }
  }, [userId, page]);

  const depositHistoryColumns = [
    {
      key: "checkbox",
      header: <input type="checkbox" className="admin-table-checkbox" />,
      cellClassName: "admin-table-checkbox-cell",
      headerClassName: "admin-table-checkbox-cell",
      disableSortArrow: true,
      render: () => <input type="checkbox" className="admin-table-checkbox" />,
    },
    {
      key: "deposit",
      header: "Deposit",
      render: () => "Deposit",
    },
    {
      key: "date",
      header: "Date",
      render: (deposit) => deposit.date || "-",
    },
    {
      key: "amount",
      header: "Coins",
      render: (deposit) =>
        deposit.amount !== null && deposit.amount !== undefined
          ? `+ ${deposit.amount.toLocaleString()}`
          : "-",
    },
    {
      key: "status",
      header: "Deposit request",
      render: (deposit) => {
        if (deposit.status === "COMPLETED") return "Transfer completed";
        if (deposit.status === "FAILED") return "Failed";

        if (deposit.status === "PENDING") {
          return (
            <span
              className="admin-table-link"
              onClick={() =>
                navigate(
                  `/admin/users/${userId}/deposit-history/${deposit.id}/charge`,
                  {
                    state: {
                      userName: selectedUserName,
                      amount: deposit.amount,
                      depositId: deposit.id,
                    },
                  },
                )
              }
            >
              Request
            </span>
          );
        }

        return deposit.status || "-";
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
            title={`Deposit history ${selectedUserName}`}
            breadcrumbSection="Lists"
            breadcrumbPage="Users / Deposit history"
          >
            {loading && <p>Loading deposit history...</p>}
            {!loading && error && <p>{error}</p>}
            {!loading && !error && deposits.length === 0 && (
              <p>No deposit history found.</p>
            )}

            {!loading && !error && deposits.length > 0 && (
              <div className="admin-table user-deposit-history-table">
                <AdminTable data={deposits} columns={depositHistoryColumns} />
              </div>
            )}

            <div className="admin-page-footer">
              <AdminPagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default UserDepositHistoryPage;

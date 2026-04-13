import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAdminUserDepositHistory } from "../../../services/adminUser";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import AdminPagination from "../../../components/admin/AdminPagination";
import AdminTable from "../../../components/admin/AdminTable";
import { userDepositHistoryColumns } from "../../../components/admin/DefaultUserColumns";
import "../../../styles/Admin/UserPages/UserDepositHistoryPage.css";

const UserDepositHistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();

  const selectedUserName = location.state?.userName || "User";

  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchDepositHistory = async () => {
      if (!userId || Number.isNaN(Number(userId))) {
        navigate("/admin/users");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getAdminUserDepositHistory(Number(userId), {
          page,
          size: 5,
          sortBy: "id",
          sortDirection: "ASC",
        });

        setDeposits(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (apiError) {
        console.error("Failed to fetch deposit history:", apiError);

        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to load deposit history.";

        setError(backendMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositHistory();
  }, [userId, page, navigate]);

  const handleOpenChargePage = (deposit) => {
    if (!userId || Number.isNaN(Number(userId))) {
      navigate("/admin/users");
      return;
    }

    navigate(`/admin/users/${userId}/charge/${deposit.id}`, {
      state: {
        userName: selectedUserName,
        amount: deposit.amount,
      },
    });
  };

  const depositColumns = userDepositHistoryColumns(handleOpenChargePage);

  return (
    <AdminLayout>
      <AdminPageShell
        title={`Deposit history ${selectedUserName}`}
        breadcrumbSection="Lists"
        breadcrumbPage="Users / Deposit history"
        showControls={false}
      >
        {loading && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">Loading deposit history...</div>
          </div>
        )}

        {!loading && error && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">{error}</div>
          </div>
        )}

        {!loading && !error && (
          <>
            {deposits.length > 0 && (
              <div className="user-deposit-history-table-wrapper">
                <AdminTable
                  data={deposits}
                  columns={depositColumns}
                  tableClassName="user-deposit-history-table"
                />
              </div>
            )}

            {deposits.length === 0 && (
              <div className="admin-empty-wrapper">
                <div className="admin-empty-state">
                  No deposit history found
                </div>
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

export default UserDepositHistoryPage;

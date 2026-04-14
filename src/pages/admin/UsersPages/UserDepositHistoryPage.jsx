import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAdminUserDepositHistory } from "../../../services/adminUser";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import AdminPagination from "../../../components/admin/AdminPagination";
import AdminTable from "../../../components/admin/AdminTable";
import AdminControls from "../../../components/admin/AdminControls";
import { userDepositHistoryColumns } from "../../../components/admin/DefaultUserColumns";
import "../../../styles/Admin/UserPages/UserDepositHistoryPage.css";

const UserDepositHistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();

  const selectedUserName = location.state?.userName || "User";
  const selectedUserPhone = location.state?.phone || "-";

  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
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
        setError("");

        if (page === 0) {
          setLoading(true);
        } else {
          setIsFetching(true);
        }

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
        setIsFetching(false);
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
        phone: selectedUserPhone,
        amount: deposit.amount,
      },
    });
  };

  const handleControlsApply = ({ action }) => {
    if (action === "show-all") {
      setPage(0);
      return;
    }

    if (action === "first-page") {
      setPage(0);
      return;
    }

    if (action === "last-page") {
      setPage(Math.max(0, totalPages - 1));
    }
  };

  const depositColumns = userDepositHistoryColumns(handleOpenChargePage);

  return (
    <AdminLayout>
      <AdminPageShell
        title={`Deposit history ${selectedUserName}`}
        showControls
        controls={
          <AdminControls
            filterOptions={[]}
            disableSearch={true}
            onApply={handleControlsApply}
          />
        }
        breadcrumbs={[
          { label: "Lists" },
          { label: "Users", path: "/admin/users" },
          { label: "Deposit History" },
        ]}
      >
        {loading && deposits.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">Loading deposit history...</div>
          </div>
        )}

        {!loading && error && deposits.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">{error}</div>
          </div>
        )}

        {deposits.length > 0 && (
          <>
            <div className="user-deposit-history-table-wrapper">
              <AdminTable
                data={deposits}
                columns={depositColumns}
                tableClassName="user-deposit-history-table"
              />
            </div>

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

        {!loading && !isFetching && !error && deposits.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">No deposit history found</div>
          </div>
        )}
      </AdminPageShell>
    </AdminLayout>
  );
};

export default UserDepositHistoryPage;

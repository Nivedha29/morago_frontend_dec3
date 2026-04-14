import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAdminUserCallHistory } from "../../../services/adminUser";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import AdminPagination from "../../../components/admin/AdminPagination";
import AdminTable from "../../../components/admin/AdminTable";
import { userCallHistoryColumns } from "../../../components/admin/DefaultUserColumns";
import "../../../styles/Admin/UserPages/UserCallHistoryPage.css";

const UserCallHistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();

  const selectedUserName = location.state?.userName || "User";

  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCallHistory = async () => {
      if (!userId || Number.isNaN(Number(userId))) {
        navigate("/admin/users");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getAdminUserCallHistory(Number(userId), {
          page,
          size: 5,
          sortBy: "id",
          sortDirection: "ASC",
        });

        setCalls(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (apiError) {
        console.error("Failed to fetch user call history:", apiError);

        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to load call history.";

        setError(backendMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCallHistory();
  }, [userId, page, navigate]);

  return (
    <AdminLayout>
      <AdminPageShell
        title={`Call history ${selectedUserName}`}
        breadcrumbSection="Lists"
        breadcrumbPage="Users / Call history"
      >
        {/* Loading */}
        {loading && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">Loading call history...</div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">{error}</div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {calls.length > 0 && (
              <AdminTable
                data={calls}
                columns={userCallHistoryColumns}
                tableClassName="user-call-history-table"
              />
            )}

            {calls.length === 0 && (
              <div className="admin-empty-wrapper">
                <div className="admin-empty-state">No call history found</div>
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

export default UserCallHistoryPage;

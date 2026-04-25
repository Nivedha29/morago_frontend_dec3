import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAdminUserCallHistory } from "../../../services/adminUser";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import AdminPagination from "../../../components/admin/AdminPagination";
import AdminTable from "../../../components/admin/AdminTable";
import AdminControls from "../../../components/admin/AdminControls";
import { userCallHistoryColumns } from "../../../components/admin/DefaultUserColumns";
import "../../../styles/Admin/UserPages/UserCallHistoryPage.css";

const UserCallHistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();

  const selectedUserName = location.state?.userName || "User";

  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
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
        setError("");

        if (page === 0) {
          setLoading(true);
        } else {
          setIsFetching(true);
        }

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
        setIsFetching(false);
      }
    };

    fetchCallHistory();
  }, [userId, page, navigate]);

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

  return (
    <AdminLayout>
      <AdminPageShell
        title={`Call history ${selectedUserName}`}
        breadcrumbs={[
          { label: "Lists" },
          { label: "Users", path: "/admin/users" },
          { label: "Call History" },
        ]}
        showControls
        controls={
          <AdminControls
            filterOptions={[]}
            disableSearch={true}
            onApply={handleControlsApply}
          />
        }
      >
        {loading && calls.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">Loading call history...</div>
          </div>
        )}

        {!loading && error && calls.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">{error}</div>
          </div>
        )}

        {calls.length > 0 && (
          <>
            <AdminTable
              data={calls}
              columns={userCallHistoryColumns}
              tableClassName="user-call-history-table"
            />

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

        {!loading && !isFetching && !error && calls.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">No call history found</div>
          </div>
        )}
      </AdminPageShell>
    </AdminLayout>
  );
};

export default UserCallHistoryPage;

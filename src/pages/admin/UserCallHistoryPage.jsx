import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAdminUserCallHistory } from "../../services/adminUser";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminTable from "../../components/admin/AdminTable";
import "../../styles/AdminLayout.css";

const UserCallHistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();

  const selectedUserName = location.state?.userName || "User";

  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCallHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminUserCallHistory({
          userId: Number(userId),
          page,
          size: 5,
        });

        setCalls(data.content || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err?.message || "Failed to load call history.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCallHistory();
    }
  }, [userId, page]);

  const callHistoryColumns = [
    {
      key: "checkbox",
      header: <input type="checkbox" className="admin-table-checkbox" />,
      cellClassName: "admin-table-checkbox-cell",
      headerClassName: "admin-table-checkbox-cell",
      disableSortArrow: true,
      render: () => <input type="checkbox" className="admin-table-checkbox" />,
    },
    {
      key: "name",
      header: "Call",
      render: (call) => call.name || call.phone || "-",
    },
    {
      key: "date",
      header: "Date",
      render: (call) => call.date || "-",
    },
    {
      key: "duration",
      header: "Duration",
      render: (call) => (call.duration ? `${call.duration} min` : "-"),
    },
    {
      key: "coins",
      header: "Coins",
      render: (call) => call.coins ?? "-",
    },
    {
      key: "theme",
      header: "Theme",
      render: (call) => call.theme || "-",
    },
    {
      key: "hasRequest",
      header: "Deposit request",
      render: (call) => (call.hasRequest ? "Yes" : "None"),
    },
    {
      key: "rating",
      header: "Rating",
      render: (call) => {
        const rating = Number(call.rating);

        if (!rating) return "-";

        return "★".repeat(Math.round(rating));
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
            title={`Call history ${selectedUserName}`}
            breadcrumbSection="Lists"
            breadcrumbPage="Users / History"
          >
            {loading && <p>Loading call history...</p>}
            {!loading && error && <p>{error}</p>}
            {!loading && !error && calls.length === 0 && (
              <p>No call history found.</p>
            )}

            {!loading && !error && calls.length > 0 && (
              <div className="admin-table user-call-history-table">
                <AdminTable
                  data={calls}
                  columns={callHistoryColumns}
                  selectable={true}
                />
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

export default UserCallHistoryPage;

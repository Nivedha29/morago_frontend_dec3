import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminUserCallHistory } from "../../services/admin";
import "../../styles/AdminLayout.css";

const UserCallHistoryPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

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
          sortBy: "date",
          sortDirection: "DESC",
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

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Call history</h1>
          <p className="admin-page-breadcrumb">
            Home / Lists / Users / History
          </p>
        </div>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header admin-user-call-history-grid">
          <div>Call</div>
          <div>Date</div>
          <div>Duration</div>
          <div>Coins</div>
          <div>Theme</div>
          <div>Deposit request</div>
          <div>Rating</div>
        </div>

        {loading ? (
          <div className="admin-table-state">Loading...</div>
        ) : error ? (
          <div className="admin-table-state error">{error}</div>
        ) : calls.length === 0 ? (
          <div className="admin-table-state">No call history found.</div>
        ) : (
          calls.map((call, index) => (
            <div
              key={`${call.date}-${call.phone}-${index}`}
              className="admin-table-row admin-user-call-history-grid"
            >
              <div>{call.name || call.phone || "-"}</div>
              <div>{call.date || "-"}</div>
              <div>{call.duration ? `${call.duration} min` : "-"}</div>
              <div>{call.coins ?? "-"}</div>
              <div>{call.theme || "-"}</div>
              <div>{call.hasRequest ? "Yes" : "None"}</div>
              <div>{call.rating || "-"}</div>
            </div>
          ))
        )}
      </div>

      <div className="admin-pagination">
        <button
          type="button"
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span>
          {page + 1} / {totalPages || 1}
        </span>

        <button
          type="button"
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      <button
        type="button"
        className="admin-back-button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default UserCallHistoryPage;

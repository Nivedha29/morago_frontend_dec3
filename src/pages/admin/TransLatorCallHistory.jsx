import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminPagination from "../../components/admin/AdminPagination";
import "../../styles/AdminLayout.css";
import "../../styles/TranslatorCallHistoryPage.css";
import { getCallHistoryByUserId } from "../../services/admin";

const TranslatorCallHistoryPage = () => {
  const { id } = useParams();

  const [callHistory, setCallHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCallHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCallHistoryByUserId(Number(id), { page });

        setCallHistory(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Failed to fetch call history:", error);
        setError(error.message || "Failed to fetch call history");
      } finally {
        setLoading(false);
      }
    };

    fetchCallHistory();
  }, [id, page]);

  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Call history [translator's name]"
            breadcrumbSection="Lists"
            breadcrumbPage="Translators / Call history"
          >
            {loading && <p>Loading call history...</p>}

            {!loading && error && <p>{error}</p>}

            {!loading && !error && (
              <div className="call-history-table">
                <div className="call-history-header">
                  <div className="call-history-cell checkbox-cell">
                    <input type="checkbox" />
                  </div>
                  <div className="call-history-cell">Call</div>
                  <div className="call-history-cell">Date</div>
                  <div className="call-history-cell">Duration</div>
                  <div className="call-history-cell">Coins</div>
                  <div className="call-history-cell">Theme</div>
                  <div className="call-history-cell">Withdraw request</div>
                  <div className="call-history-cell">Rating</div>
                </div>

                {callHistory.map((item, index) => (
                  <div
                    className="call-history-row"
                    key={`${item.date}-${index}`}
                  >
                    <div className="call-history-cell checkbox-cell">
                      <input type="checkbox" />
                    </div>

                    <div className="call-history-cell">
                      {item.name || item.phone || "-"}
                    </div>

                    <div className="call-history-cell">{item.date || "-"}</div>

                    <div className="call-history-cell">
                      {item.duration ? `${item.duration} min` : "-"}
                    </div>

                    <div className="call-history-cell">
                      {item.coins ? `+ ${item.coins}` : "-"}
                    </div>

                    <div className="call-history-cell">{item.theme || "-"}</div>

                    <div className="call-history-cell">
                      {item.hasRequest ? "Request" : "None"}
                    </div>

                    <div className="call-history-cell">
                      {item.rating || "-"}
                    </div>
                  </div>
                ))}
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

export default TranslatorCallHistoryPage;

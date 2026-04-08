import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminPagination from "../../components/admin/AdminPagination";
import "../../styles/TranslatorCallHistoryPage.css";
import {
  getCallHistoryByUserId,
  getTranslatorById,
} from "../../services/admin";

const TranslatorCallHistoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [callHistory, setCallHistory] = useState([]);
  const [translatorName, setTranslatorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTranslator = async () => {
      if (!id || Number.isNaN(Number(id))) {
        navigate("/admin/translators");
        return;
      }

      try {
        const data = await getTranslatorById(Number(id));

        const fullName =
          data.firstName || data.lastName
            ? `${data.firstName || ""} ${data.lastName || ""}`.trim()
            : data.phone || "Unknown";

        setTranslatorName(fullName);
      } catch (apiError) {
        console.error("Failed to fetch translator name:", apiError);
      }
    };

    fetchTranslator();
  }, [id, navigate]);

  useEffect(() => {
    const fetchCallHistory = async () => {
      if (!id || Number.isNaN(Number(id))) {
        navigate("/admin/translators");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getCallHistoryByUserId(Number(id), {
          page,
          size: 5,
          sortBy: "id",
          sortDirection: "ASC",
        });

        setCallHistory(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (apiError) {
        console.error("Failed to fetch call history:", apiError);

        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to fetch call history";

        setError(
          backendMessage.includes("getNameWithInitials")
            ? "Failed to load call history due to missing user data."
            : backendMessage,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCallHistory();
  }, [id, page, navigate]);

  return (
    <AdminLayout>
      <AdminPageShell
        title={`Call history ${translatorName ? `${translatorName}` : ""}`}
        breadcrumbSection="Lists"
        breadcrumbPage="Translators / Call history"
      >
        {loading && (
          <div className="translator-call-history-empty-state">
            Loading call history...
          </div>
        )}

        {!loading && error && (
          <div className="translator-call-history-empty-state">{error}</div>
        )}

        {!loading && !error && (
          <>
            <div className="translator-call-history-table">
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
            </div>

            {callHistory.length === 0 && (
              <div className="translator-call-history-empty-state">
                No call history found
              </div>
            )}

            {!loading && totalPages > 0 && (
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

export default TranslatorCallHistoryPage;

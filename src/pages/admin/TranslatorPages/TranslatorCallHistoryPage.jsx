import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import AdminPagination from "../../../components/admin/AdminPagination";
import AdminTable from "../../../components/admin/AdminTable";
import { callHistoryColumns } from "../../../components/admin/DefaultTranslatorColumns";
import "../../../styles/Admin/TranslatorPages/TranslatorCallHistoryPage.css";

import {
  getCallHistoryByUserId,
  getTranslatorById,
} from "../../../services/admin";

const TranslatorCallHistoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [callHistory, setCallHistory] = useState([]);
  const [translatorName, setTranslatorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
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
        setError("");

        if (page === 0) {
          setLoading(true);
        } else {
          setIsFetching(true);
        }

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
        setIsFetching(false);
      }
    };

    fetchCallHistory();
  }, [id, page, navigate]);

  return (
    <AdminLayout>
      <AdminPageShell
        title={`Call history ${translatorName ? translatorName : ""}`}
        breadcrumbs={[
          { label: "Lists" },
          { label: "Translators", path: "/admin/translators" },
          { label: "Call history" },
        ]}
      >
        {loading && callHistory.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">Loading call history...</div>
          </div>
        )}

        {!loading && error && callHistory.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">{error}</div>
          </div>
        )}

        {callHistory.length > 0 && (
          <>
            <AdminTable
              data={callHistory}
              columns={callHistoryColumns()}
              tableClassName="admin-call-history-table"
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

        {!loading && !isFetching && !error && callHistory.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">No call history found</div>
          </div>
        )}
      </AdminPageShell>
    </AdminLayout>
  );
};

export default TranslatorCallHistoryPage;

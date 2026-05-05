import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import AdminTable from "../../../components/admin/AdminTable";
import AdminPagination from "../../../components/admin/AdminPagination";
import AdminControls from "../../../components/admin/AdminControls";
import TranslatorDetailModal from "../../../components/admin/TranslatorDetailModal";
import { defaultTranslatorColumns } from "../../../components/admin/DefaultTranslatorColumns";
import {
  getAdminTranslators,
  getTranslatorById,
  updateTranslatorById,
} from "../../../services/admin";

const AdminTranslatorPage = () => {
  const [translators, setTranslators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [keyword, setKeyword] = useState("");
  const [isActive, setIsActive] = useState(undefined);
  const [hasWithdrawal, setHasWithdrawal] = useState(undefined);

  const [selectedTranslatorId, setSelectedTranslatorId] = useState(null);
  const [selectedTranslatorDetail, setSelectedTranslatorDetail] =
    useState(null);

  const navigate = useNavigate();

  const fetchTranslators = useCallback(async () => {
    try {
      setError("");

      if (page === 0) {
        setLoading(true);
      } else {
        setIsFetching(true);
      }

      const data = await getAdminTranslators({
        keyword,
        isActive,
        hasWithdrawal,
        page,
        size,
        sortBy: "id",
        sortDirection: "ASC",
      });

      setTranslators(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (apiError) {
      const backendMessage =
        apiError?.message ||
        apiError?.details?.error ||
        apiError?.details?.message ||
        "Failed to fetch translators";

      setError(backendMessage);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [keyword, isActive, hasWithdrawal, page, size]);

  useEffect(() => {
    fetchTranslators();
  }, [fetchTranslators]);

  useEffect(() => {
    const fetchTranslatorDetail = async () => {
      if (!selectedTranslatorId) return;

      try {
        const data = await getTranslatorById(selectedTranslatorId);
        setSelectedTranslatorDetail(data);
      } catch (apiError) {
        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to fetch translator detail";

        setError(backendMessage);
      }
    };

    fetchTranslatorDetail();
  }, [selectedTranslatorId]);

  const handleToggleActive = async (id, currentIsActive) => {
    try {
      await updateTranslatorById(id, {
        isActive: !currentIsActive,
      });

      setSelectedTranslatorId(null);
      setSelectedTranslatorDetail(null);

      fetchTranslators();
    } catch (apiError) {
      const backendMessage =
        apiError?.message ||
        apiError?.details?.error ||
        apiError?.details?.message ||
        "Failed to update translator status";

      setError(backendMessage);
    }
  };

  const translatorColumns = defaultTranslatorColumns(
    (translator) => {
      navigate(`/admin/translators/${translator.id}/withdraw`);
    },
    (translator) => {
      navigate(`/admin/translators/${translator.id}/call-history`);
    },
    (translator) => {
      navigate(`/admin/translators/${translator.id}/withdraw-history`);
    },
    (translator) => {
      setSelectedTranslatorId(translator.id);
    },
  );

  const handleControlsApply = ({ search, filter, action }) => {
    if (action === "show-all") {
      setPage(0);
      setKeyword("");
      setIsActive(undefined);
      setHasWithdrawal(undefined);
      return;
    }

    if (action === "first-page") {
      setPage(0);
      return;
    }

    if (action === "last-page") {
      setPage(Math.max(0, totalPages - 1));
      return;
    }

    if (search !== undefined) {
      setPage(0);
      setKeyword(search);
    }

    if (filter === "active") {
      setPage(0);
      setIsActive(true);
      setHasWithdrawal(undefined);
    } else if (filter === "inactive") {
      setPage(0);
      setIsActive(false);
      setHasWithdrawal(undefined);
    } else if (filter === "has-withdrawal") {
      setPage(0);
      setIsActive(undefined);
      setHasWithdrawal(true);
    } else if (filter === "no-withdrawal") {
      setPage(0);
      setIsActive(undefined);
      setHasWithdrawal(false);
    }
  };

  return (
    <AdminLayout>
      <AdminPageShell
        title="Translators list"
        breadcrumbs={[{ label: "Lists" }, { label: "Translators" }]}
        showControls
        controls={
          <AdminControls
            filterOptions={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Has pending withdrawal", value: "has-withdrawal" },
              { label: "No pending withdrawal", value: "no-withdrawal" },
            ]}
            onApply={handleControlsApply}
          />
        }
      >
        {loading && translators.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">Loading translators...</div>
          </div>
        )}

        {!loading && error && translators.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">{error}</div>
          </div>
        )}

        {translators.length > 0 && (
          <>
            <AdminTable
              data={translators}
              columns={translatorColumns}
              tableClassName="admin-translator-table"
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

        {!loading && !isFetching && !error && translators.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">No translators found.</div>
          </div>
        )}
      </AdminPageShell>

      {selectedTranslatorDetail && (
        <TranslatorDetailModal
          translator={selectedTranslatorDetail}
          onClose={() => {
            setSelectedTranslatorId(null);
            setSelectedTranslatorDetail(null);
          }}
          onToggleActive={handleToggleActive}
        />
      )}
    </AdminLayout>
  );
};

export default AdminTranslatorPage;

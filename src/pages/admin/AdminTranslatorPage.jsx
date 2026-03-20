import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import TranslatorDetailModal from "../../components/admin/TranslatorDetailModal";
import "../../styles/AdminLayout.css";

import { getAdminTranslators, getTranslatorById } from "../../services/admin";

const AdminTranslatorPage = () => {
  const [translators, setTranslators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedTranslatorId, setSelectedTranslatorId] = useState(null);
  const [selectedTranslatorDetail, setSelectedTranslatorDetail] =
    useState(null);

  useEffect(() => {
    const fetchTranslators = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminTranslators({
          page,
          size,
          sortBy: "id",
          sortDirection: "ASC",
        });

        setTranslators(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        console.error("Failed to fetch translators:", err);
        setError(err.message || "Failed to fetch translators");
      } finally {
        setLoading(false);
      }
    };

    fetchTranslators();
  }, [page, size]);

  useEffect(() => {
    const fetchTranslatorDetail = async () => {
      if (!selectedTranslatorId) return;

      try {
        const data = await getTranslatorById(selectedTranslatorId);
        setSelectedTranslatorDetail(data);
      } catch (error) {
        console.error("Failed to fetch translator detail:", error);
      }
    };

    fetchTranslatorDetail();
  }, [selectedTranslatorId]);

  return (
    <AdminLayout>
      <AdminPageShell
        title="Translators list"
        breadcrumbSection="Lists"
        breadcrumbPage="Translators"
      >
        {loading && <p>Loading translators...</p>}

        {!loading && error && <p>{error}</p>}

        {!loading && !error && translators.length === 0 && (
          <p>No translators found.</p>
        )}

            {!loading && !error && translators.length > 0 && (
              <AdminTable
                translators={translators}
                onViewTranslator={(translator) =>
                  setSelectedTranslatorId(translator.id)
                }
              />
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
      </AdminPageShell>
    </AdminLayout>
  );
};

export default AdminTranslatorPage;

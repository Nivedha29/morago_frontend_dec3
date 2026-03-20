import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
<<<<<<< HEAD
=======
import TranslatorDetailModal from "../../components/admin/TranslatorDetailModal";
import "../../styles/AdminLayout.css";

>>>>>>> 76275a5 ( linked Modal to Icon)
import { getAdminTranslators } from "../../services/admin";

const AdminTranslatorPage = () => {
  const [translators, setTranslators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTranslator, setSelectedTranslator] = useState(null);

  useEffect(() => {
    const fetchTranslators = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminTranslators({ page });

        setTranslators(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Failed to fetch translators:", error);
        setError(error.message || "Failed to fetch translators");
      } finally {
        setLoading(false);
      }
    };

    fetchTranslators();
  }, [page]);

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
            onViewTranslator={setSelectedTranslator}
          />
        )}

        <div className="admin-page-footer">
          <AdminPagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
<<<<<<< HEAD
      </AdminPageShell>
    </AdminLayout>
=======
      </div>
      {selectedTranslator && (
        <TranslatorDetailModal
          translator={selectedTranslator}
          onClose={() => setSelectedTranslator(null)}
        />
      )}
    </div>
>>>>>>> 76275a5 ( linked Modal to Icon)
  );
};

export default AdminTranslatorPage;
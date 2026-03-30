import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import { getAdminTranslators } from "../../services/admin";

const AdminTranslatorPage = () => {
  const [translators, setTranslators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTranslators = async () => {
      try {
        const data = await getAdminTranslators();
        console.log("translator response:", data);
        console.log("translator content:", data.content);
        setTranslators(data.content || []);
      } catch (error) {
        console.error("Failed to fetch translators:", error);
        setError(error.message || "Failed to fetch translators");
      } finally {
        setLoading(false);
      }
    };

    fetchTranslators();
  }, []);

  return (
    <AdminLayout>
      <AdminPageShell
        title="Translators list"
        breadcrumbSection="Lists"
        breadcrumbPage="Translators"
      >
        {loading ? (
          <p>Loading translators...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <AdminTable translators={translators} />
        )}

        <div className="admin-page-footer">
          <AdminPagination />
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
};

export default AdminTranslatorPage;
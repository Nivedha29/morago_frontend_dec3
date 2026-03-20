import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import "../../styles/AdminLayout.css";

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
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
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
              <AdminTable translators={translators} />
            )}
            <div className="admin-page-footer">
              <AdminPagination />
            </div>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AdminTranslatorPage;

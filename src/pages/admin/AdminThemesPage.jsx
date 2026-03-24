import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminTable from "../../components/admin/AdminTable";
import ThemeDetailModal from "../../components/admin/ThemeDetailModal";
import eyeIcon from "../../assets/eye.svg";
import { getAdminThemes, getAdminThemeById } from "../../services/adminThemes.ts";
import "../../styles/AdminLayout.css";

const AdminThemesPage = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenThemeDetail = async (theme) => {
    try {
      setIsDetailModalOpen(true);
      setDetailLoading(true);
      setDetailError("");
      setSelectedTheme(null);

      const data = await getAdminThemeById(theme.id);
      setSelectedTheme(data);
    } catch (error) {
      console.error("Failed to fetch theme detail:", error);
      setDetailError(error.message || "Failed to fetch theme details");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseThemeDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedTheme(null);
    setDetailError("");
    setDetailLoading(false);
  };

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminThemes({
          page,
          size: 10,
          sortBy: "id",
          sortDirection: "ASC",
        });

        setThemes(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Failed to fetch themes:", error);
        setError(error.message || "Failed to fetch themes");
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, [page]);

  const themeColumns = [
    {
      key: "checkbox",
      header: <input type="checkbox" className="admin-table-checkbox" />,
      cellClassName: "admin-table-checkbox-cell",
      headerClassName: "admin-table-checkbox-cell",
      disableSortArrow: true,
      render: () => <input type="checkbox" className="admin-table-checkbox" />,
    },
    {
      key: "theme",
      header: "Theme",
      render: (theme) => theme.title || theme.name || "-",
    },
    {
      key: "category",
      header: "Categories",
      render: () => "Choose...",
    },
    {
      key: "status",
      header: "Status",
      render: (theme) => (theme.isActive ? "Active" : "Inactive"),
    },
    {
      key: "icon",
      header: "Icon",
      render: (theme) =>
        theme.iconUrl ? (
          <a
            href={theme.iconUrl}
            target="_blank"
            rel="noreferrer"
            className="admin-table-file-link"
          >
            File name 1
          </a>
        ) : (
          "-"
        ),
    },
    {
      key: "action",
      header: "",
      cellClassName: "admin-table-action-cell",
      headerClassName: "admin-table-action-cell",
      disableSortArrow: true,
      onClick: (theme) => handleOpenThemeDetail(theme),
      render: () => (
        <img src={eyeIcon} alt="view" className="admin-table-eye-icon" />
      ),
    },
  ];

  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Themes"
            breadcrumbSection="Translation topics"
            breadcrumbPage="Themes"
          >
            {loading && <p>Loading themes...</p>}
            {!loading && error && <p>{error}</p>}
            {!loading && !error && themes.length === 0 && (
              <p>No themes found.</p>
            )}

            {!loading && !error && themes.length > 0 && (
              <div className="admin-table themes-table">
                <AdminTable data={themes} columns={themeColumns} />
              </div>
            )}

            <div className="admin-page-footer">
              <AdminPagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
            {isDetailModalOpen && (
              <ThemeDetailModal
                theme={selectedTheme}
                loading={detailLoading}
                error={detailError}
                onClose={handleCloseThemeDetail}
              />
            )}
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AdminThemesPage;

import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import AdminPageShell from "../../components/admin/AdminPageShell.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";
import AdminPagination from "../../components/admin/AdminPagination.jsx";
import AdminControls from "../../components/admin/AdminControls.jsx";
import { defaultThemeColumns } from "../../components/admin/DefaultThemeColumns.jsx";
import { getAdminThemes } from "../../services/adminThemes.ts";

const AdminThemesPage = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [keyword, setKeyword] = useState("");
  const [isActive, setIsActive] = useState(undefined);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setError("");

        if (page === 0) {
          setLoading(true);
        } else {
          setIsFetching(true);
        }

        const data = await getAdminThemes({
          keyword,
          isActive,
          page,
          size,
          sortBy: "id",
          sortDirection: "ASC",
        });

        setThemes(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (apiError) {
        console.error("Failed to fetch themes:", apiError);

        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to fetch themes";

        setError(backendMessage);
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    };

    fetchThemes();
  }, [keyword, isActive, page, size]);

  const handleControlsApply = ({ search, filter, action }) => {
    if (action === "show-all") {
      setPage(0);
      setKeyword("");
      setIsActive(undefined);
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
    } else if (filter === "inactive") {
      setPage(0);
      setIsActive(false);
    }
  };

  const themeColumns = defaultThemeColumns((theme) => {
    console.log("View theme:", theme);
  });

  return (
    <AdminLayout>
      <AdminPageShell
        title="Themes"
        breadcrumbs={[{ label: "Translation topics" }, { label: "Themes" }]}
        showControls
        controls={
          <AdminControls
            filterOptions={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            onApply={handleControlsApply}
          />
        }
      >
        {loading && themes.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">Loading themes...</div>
          </div>
        )}

        {!loading && error && themes.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">{error}</div>
          </div>
        )}

        {themes.length > 0 && (
          <>
            <AdminTable
              data={themes}
              columns={themeColumns}
              tableClassName="admin-themes-table"
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

        {!loading && !isFetching && !error && themes.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">No themes found.</div>
          </div>
        )}
      </AdminPageShell>
    </AdminLayout>
  );
};

export default AdminThemesPage;

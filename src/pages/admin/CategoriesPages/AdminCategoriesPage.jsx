import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout.jsx";
import AdminPageShell from "../../../components/admin/AdminPageShell.jsx";
import AdminTable from "../../../components/admin/AdminTable.jsx";
import AdminPagination from "../../../components/admin/AdminPagination.jsx";
import AdminControls from "../../../components/admin/AdminControls.jsx";
import { defaultCategoryColumns } from "../../../components/admin/DefaultCategoryColumns.jsx";
import { getAdminCategories } from "../../../services/adminCategory";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [keyword, setKeyword] = useState("");
  const [isActive, setIsActive] = useState(undefined);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setError("");

        if (page === 0) {
          setLoading(true);
        } else {
          setIsFetching(true);
        }

        const data = await getAdminCategories({
          keyword,
          isActive,
          page,
          size,
          sortBy: "id",
          sortDirection: "ASC",
        });

        setCategories(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (apiError) {
        console.error("Failed to fetch categories:", apiError);

        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to fetch categories";

        setError(backendMessage);
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    };

    fetchCategories();
  }, [keyword, isActive, page, size]);

  const handleOpenCategoryDetail = (category) => {
    console.log("Open category detail:", category.id);
  };

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

  const categoryColumns = defaultCategoryColumns((category) => {
    handleOpenCategoryDetail(category);
  });

  return (
    <AdminLayout>
      <AdminPageShell
        title="Categories"
        breadcrumbs={[{ label: "Translation topics" }, { label: "Categories" }]}
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
        {loading && categories.length === 0 && (
          <div className="admin-empty-wrapper admin-categories-page__empty-wrapper">
            <div className="admin-empty-state admin-categories-page__empty-state">
              Loading categories...
            </div>
          </div>
        )}

        {!loading && error && categories.length === 0 && (
          <div className="admin-empty-wrapper admin-categories-page__empty-wrapper">
            <div className="admin-empty-state admin-categories-page__empty-state">
              {error}
            </div>
          </div>
        )}

        {categories.length > 0 && (
          <>
            <AdminTable
              data={categories}
              columns={categoryColumns}
              tableClassName="admin-categories-table"
            />

            {totalPages > 0 && (
              <div className="admin-page-footer admin-categories-page__footer">
                <AdminPagination
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </>
        )}

        {!loading && !isFetching && !error && categories.length === 0 && (
          <div className="admin-empty-wrapper admin-categories-page__empty-wrapper">
            <div className="admin-empty-state admin-categories-page__empty-state">
              No categories found.
            </div>
          </div>
        )}
      </AdminPageShell>
    </AdminLayout>
  );
};

export default AdminCategoryPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import AdminTable from "../../../components/admin/AdminTable";
import { defaultUserColumns } from "../../../components/admin/DefaultUserColumns";
import AdminPagination from "../../../components/admin/AdminPagination";
import { getAdminUsers } from "../../../services/adminUser";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminUsers({
          page,
          size,
          sortBy: "id",
          sortDirection: "ASC",
        });

        setUsers(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (apiError) {
        console.error("Failed to fetch users:", apiError);

        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to fetch users";

        setError(backendMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, size]);

  const userColumns = defaultUserColumns(
    (user) => {
      console.log("Open user detail:", user.id);
    },
    (user) => {
      navigate(`/admin/users/${user.id}/call-history`);
    },
    (user) => {
      navigate(`/admin/users/${user.id}/deposit-history`);
    },
  );

  return (
    <AdminLayout>
      <AdminPageShell
        title="Users list"
        breadcrumbSection="Lists"
        breadcrumbPage="Users"
      >
        {loading && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">Loading users...</div>
          </div>
        )}

        {!loading && error && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">{error}</div>
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">No users found.</div>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <AdminTable
            data={users}
            columns={userColumns}
            tableClassName="admin-user-table"
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

export default AdminUserPage;

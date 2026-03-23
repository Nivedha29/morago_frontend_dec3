import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable, {
  defaultUserColumns,
} from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import "../../styles/AdminLayout.css";
import { getAdminUsers } from "../../services/adminUser";

const AdminUserPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminUsers({ page });

        setUsers(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError(error.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

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
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Users list"
            breadcrumbSection="Lists"
            breadcrumbPage="Users"
          >
            {loading && <p>Loading users...</p>}

            {!loading && error && <p>{error}</p>}

            {!loading && !error && users.length === 0 && <p>No users found.</p>}

            {!loading && !error && users.length > 0 && (
              <AdminTable data={users} columns={userColumns} />
            )}

            <div className="admin-page-footer">
              <AdminPagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;

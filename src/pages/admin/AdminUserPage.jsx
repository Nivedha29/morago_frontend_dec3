import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable, {
  defaultUserColumns,
} from "../../components/admin/AdminTable";
import UserDetailModal from "../../components/admin/UserDetailModal";

import AdminPagination from "../../components/admin/AdminPagination";
import "../../styles/AdminLayout.css";
import { getAdminUsers, getAdminUserById } from "../../services/adminUser";

const AdminUserPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleUserCallHistory = (user) => {
    navigate(`/admin/users/${user.id}/call-history`);
  };

  const handleOpenUserDetail = async (user) => {
    try {
      setIsDetailModalOpen(true);
      setDetailLoading(true);
      setDetailError("");
      setSelectedUser(null);

      const data = await getAdminUserById(user.id);
      setSelectedUser(data);
    } catch (error) {
      console.error("Failed to fetch user detail:", error);
      setDetailError(error.message || "Failed to fetch user details");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseUserDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedUser(null);
    setDetailError("");
    setDetailLoading(false);
  };

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
      handleOpenUserDetail(user);
    },
    (user) => {
      navigate(`/admin/users/${user.id}/call-history`, {
        state: {
          userName:
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            user.phone,
        },
      });
    },
    (user) => {
      navigate(`/admin/users/${user.id}/deposit-history`, {
        state: {
          userName:
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            user.phone,
        },
      });
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
              <div className="admin-table users-table">
                <AdminTable
                  data={users}
                  columns={userColumns}
                  onUserCallClick={handleUserCallHistory}
                />
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
              <UserDetailModal
                user={selectedUser}
                loading={detailLoading}
                error={detailError}
                onClose={handleCloseUserDetail}
              />
            )}
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;

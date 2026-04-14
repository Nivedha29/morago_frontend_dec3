import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import AdminTable from "../../../components/admin/AdminTable";
import { defaultUserColumns } from "../../../components/admin/DefaultUserColumns";
import AdminPagination from "../../../components/admin/AdminPagination";
import UserDetailModal from "../../../components/admin/UserDetailModal";
import { getAdminUsers, getAdminUserById } from "../../../services/adminUser";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetailLoading, setUserDetailLoading] = useState(false);
  const [userDetailError, setUserDetailError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError("");

        if (page === 0) {
          setLoading(true);
        } else {
          setIsFetching(true);
        }

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
        setIsFetching(false);
      }
    };

    fetchUsers();
  }, [page, size]);

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!selectedUserId || !isUserModalOpen) return;

      try {
        setUserDetailLoading(true);
        setUserDetailError("");
        setSelectedUser(null);

        const data = await getAdminUserById(selectedUserId);
        setSelectedUser(data);
      } catch (apiError) {
        console.error("Failed to fetch user details:", apiError);

        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to fetch user details";

        setUserDetailError(backendMessage);
      } finally {
        setUserDetailLoading(false);
      }
    };

    fetchUserDetail();
  }, [selectedUserId, isUserModalOpen]);

  const handleOpenUserModal = (user) => {
    setSelectedUserId(user.id);
    setIsUserModalOpen(true);
    setUserDetailLoading(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUserId(null);
    setSelectedUser(null);
    setUserDetailError("");
    setUserDetailLoading(false);
  };

  const userColumns = defaultUserColumns(
    (user) => {
      handleOpenUserModal(user);
    },
    (user) => {
      const fullName =
        user.firstName || user.lastName
          ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
          : user.phone || "User";

      navigate(`/admin/users/${user.id}/call-history`, {
        state: { userName: fullName },
      });
    },
    (user) => {
      const fullName =
        user.firstName || user.lastName
          ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
          : user.phone || "User";

      navigate(`/admin/users/${user.id}/deposit-history`, {
        state: {
          userName: fullName,
          phone: user.phone || "-",
        },
      });
    },
  );

  return (
    <AdminLayout>
      <AdminPageShell
        title="Users list"
        breadcrumbs={[{ label: "Lists" }, { label: "Users" }]}
      >
        {loading && users.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">Loading users...</div>
          </div>
        )}

        {!loading && error && users.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">{error}</div>
          </div>
        )}

        {users.length > 0 && (
          <>
            <AdminTable
              data={users}
              columns={userColumns}
              tableClassName="admin-user-table"
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

        {!loading && !isFetching && !error && users.length === 0 && (
          <div className="admin-empty-wrapper">
            <div className="admin-empty-state">No users found.</div>
          </div>
        )}

        {isUserModalOpen && (
          <UserDetailModal
            user={selectedUser}
            loading={userDetailLoading}
            error={userDetailError}
            onClose={handleCloseUserModal}
          />
        )}
      </AdminPageShell>
    </AdminLayout>
  );
};

export default AdminUserPage;

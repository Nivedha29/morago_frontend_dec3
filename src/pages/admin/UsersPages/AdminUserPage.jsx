import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import AdminTable from "../../../components/admin/AdminTable";
import AdminPagination from "../../../components/admin/AdminPagination";
import AdminControls from "../../../components/admin/AdminControls";
import UserDetailModal from "../../../components/admin/UserDetailModal";
import { defaultUserColumns } from "../../../components/admin/DefaultUserColumns";
import {
  getAdminUsers,
  getAdminUserById,
  updateAdminUser,
} from "../../../services/adminUser";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [keyword, setKeyword] = useState("");
  const [isDebtor, setIsDebtor] = useState(undefined);
  const [hasDeposit, setHasDeposit] = useState(undefined);

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
          keyword,
          isDebtor,
          hasDeposit,
          page,
          size,
          sortBy: "id",
          sortDirection: "ASC",
        });

        setUsers(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (apiError) {
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
  }, [keyword, isDebtor, hasDeposit, page, size]);

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

  const handleToggleUserActive = async (id, currentIsActive) => {
    try {
      await updateAdminUser(id, {
        ...selectedUser,
        isActive: !currentIsActive,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isActive: !currentIsActive } : user,
        ),
      );

      handleCloseUserModal();
    } catch (apiError) {
      const backendMessage =
        apiError?.message ||
        apiError?.details?.error ||
        apiError?.details?.message ||
        "Failed to update user status";

      setUserDetailError(backendMessage);
    }
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

  const handleControlsApply = ({ search, filter, action }) => {
    if (action === "show-all") {
      setPage(0);
      setKeyword("");
      setIsDebtor(undefined);
      setHasDeposit(undefined);
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

    if (filter === "debtor") {
      setPage(0);
      setIsDebtor(true);
      setHasDeposit(undefined);
    } else if (filter === "not-debtor") {
      setPage(0);
      setIsDebtor(false);
      setHasDeposit(undefined);
    } else if (filter === "has-deposit") {
      setPage(0);
      setIsDebtor(undefined);
      setHasDeposit(true);
    } else if (filter === "no-deposit") {
      setPage(0);
      setIsDebtor(undefined);
      setHasDeposit(false);
    }
  };

  return (
    <AdminLayout>
      <AdminPageShell
        title="Users list"
        breadcrumbs={[{ label: "Lists" }, { label: "Users" }]}
        showControls
        controls={
          <AdminControls
            filterOptions={[
              { label: "Debtor", value: "debtor" },
              { label: "Not debtor", value: "not-debtor" },
              { label: "Has deposit", value: "has-deposit" },
              { label: "No deposit", value: "no-deposit" },
            ]}
            onApply={handleControlsApply}
          />
        }
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
            onToggleActive={handleToggleUserActive}
          />
        )}
      </AdminPageShell>
    </AdminLayout>
  );
};

export default AdminUserPage;

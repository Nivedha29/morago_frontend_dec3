import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable, {
  defaultUserColumns,
} from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";

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
     <AdminLayout>
      <AdminPageShell
        title="Users list"
        breadcrumbSection="Lists"
        breadcrumbPage="Users"
      >
        <AdminTable />

        <div className="admin-page-footer">
          <AdminPagination />
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
};


export default AdminUserPage;

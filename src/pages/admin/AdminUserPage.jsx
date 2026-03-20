import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import "../../styles/AdminLayout.css";

const AdminUserPage = () => {
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
            <div>top controls go here</div>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;
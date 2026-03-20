import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import "../../styles/AdminLayout.css";

const AdminThemesPage = () => {
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
            <div>top controls go here</div>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AdminThemesPage;
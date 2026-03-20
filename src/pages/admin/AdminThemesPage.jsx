import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
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
            <AdminTable />

            <div className="admin-page-footer">
              <AdminPagination />
            </div>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AdminThemesPage;

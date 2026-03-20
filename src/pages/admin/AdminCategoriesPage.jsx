import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import "../../styles/AdminLayout.css";

const AdminCategoriesPage = () => {
  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Categories"
            breadcrumbSection="Translation topics"
            breadcrumbPage="Categories"
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

export default AdminCategoriesPage;

import React from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";
import "../../styles/AdminLayout.css";

const AdminTranslatorPage = () => {
  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Translators list"
            breadcrumbSection="Lists"
            breadcrumbPage="Translators"
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

export default AdminTranslatorPage;

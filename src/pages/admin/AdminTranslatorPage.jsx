import React from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import "../../styles/AdminLayout.css"; // or your css file

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
            <div>top controls go here</div>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AdminTranslatorPage;
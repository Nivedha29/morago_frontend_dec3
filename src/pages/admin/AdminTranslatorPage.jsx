import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";

const AdminTranslatorPage = () => {
  return (
    <AdminLayout>
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
    </AdminLayout>
  );
};

export default AdminTranslatorPage;
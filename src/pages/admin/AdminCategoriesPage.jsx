import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminTable from "../../components/admin/AdminTable";
import AdminPagination from "../../components/admin/AdminPagination";

const AdminCategoriesPage = () => {
  return (
    <AdminLayout>
      <AdminPageShell
        title="Categories list"
        breadcrumbSection="Lists"
        breadcrumbPage="Categories"
      >
        <AdminTable />

        <div className="admin-page-footer">
          <AdminPagination />
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;

import React from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "../../styles/AdminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout-page">
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <main className="admin-page-content">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
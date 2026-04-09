import React from "react";
import "../../styles/AdminPageShell.css";
import AdminControls from "../../components/admin/AdminControls";

const AdminPageShell = ({
  title,
  breadcrumbSection,
  breadcrumbPage,
  children,
  showControls = true,
}) => {
  return (
    <section className="admin-page-shell">
      <div className="admin-page-shell-header">
        <div className="admin-page-shell-left">
          <h1 className="admin-page-shell-title">{title}</h1>

          <div className="admin-page-shell-breadcrumb">
            <span className="admin-breadcrumb-home">Home</span>
            <span className="admin-breadcrumb-separator">/</span>
            <span className="admin-breadcrumb-section">
              {breadcrumbSection}
            </span>
            <span className="admin-breadcrumb-separator">/</span>
            <span className="admin-breadcrumb-page">{breadcrumbPage}</span>
          </div>
        </div>

        {showControls && (
          <div className="admin-page-shell-right">
            <AdminControls />
          </div>
        )}
      </div>

      <div className="admin-page-shell-body">{children}</div>
    </section>
  );
};

export default AdminPageShell;

import React from "react";
import "../../styles/AdminPageShell.css";

const AdminPageShell = ({
  title,
  breadcrumbSection,
  breadcrumbPage,
  children,
}) => {
  return (
    <section className="admin-page-shell">
      <div className="admin-page-shell-header">
        <h1 className="admin-page-shell-title">{title}</h1>

        <div className="admin-page-shell-breadcrumb">
          <span className="breadcrumb-home">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-section">{breadcrumbSection}</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-page">{breadcrumbPage}</span>
        </div>
      </div>

      {children}
    </section>
  );
};

export default AdminPageShell;
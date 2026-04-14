import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Admin/AdminPageShell.css";
import AdminControls from "../../components/admin/AdminControls";

const AdminPageShell = ({
  title,
  breadcrumbs = [],
  children,
  showControls = true,
}) => {
  const navigate = useNavigate();

  return (
    <section className="admin-page-shell">
      <div className="admin-page-shell-header">
        <div className="admin-page-shell-left">
          <h1 className="admin-page-shell-title">{title}</h1>

          <div className="admin-page-shell-breadcrumb">
            <span className="admin-breadcrumb-home">Home</span>

            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={`${crumb.label}-${index}`}>
                <span className="admin-breadcrumb-separator">/</span>

                {crumb.path ? (
                  <span
                    className="admin-breadcrumb-link"
                    onClick={() => navigate(crumb.path)}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <span className="admin-breadcrumb-page">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
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

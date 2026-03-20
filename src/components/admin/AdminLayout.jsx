import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "../../styles/AdminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout-page">
      <AdminHeader />
      <div className="admin-layout-body">
        <AdminSidebar />
        <main className="admin-layout-content">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
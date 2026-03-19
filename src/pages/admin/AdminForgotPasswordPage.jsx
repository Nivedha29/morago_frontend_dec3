import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/AdminForgotPassword.css";

const AdminForgotPasswordPage = () => {
  return (
    <div className="admin-forgot-page">
      <AdminHeader />
      <div className="admin-forgot-container">
        <div className="admin-forgot-card">
          <h1 className="admin-forgot-title">Request pass</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordPage;
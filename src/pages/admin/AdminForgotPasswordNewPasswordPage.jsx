import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/AdminForgotPassword.css";

const AdminForgotPasswordNewPasswordPage = () => {
  return (
    <div className="admin-forgot-page">
      <AdminHeader />
      <div className="admin-forgot-container">
        <div className="admin-forgot-card">
          <h1 className="admin-forgot-title">Password</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordNewPasswordPage;
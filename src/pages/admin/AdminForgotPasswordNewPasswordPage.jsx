import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/AdminForgotPassword.css";
import { useNavigate } from "react-router-dom";

const AdminForgotPasswordNewPasswordPage = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-forgot-page">
      <AdminHeader />
      <div className="admin-forgot-container">
        <div className="admin-forgot-card">
          <h1 className="admin-forgot-title">Password</h1>

          <button
            className="admin-forgot-button"
            onClick={() => navigate("/admin/login")}
          >
            Save
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordNewPasswordPage;

import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/AdminForgotPassword.css";
import { useNavigate } from "react-router-dom";

const AdminForgotPasswordPage = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-forgot-page">
      <AdminHeader />
      <div className="admin-forgot-container">
        <div className="admin-forgot-card">
          <h1 className="admin-forgot-title">Request pass</h1>

          <input
            className="admin-forgot-input"
            type="text"
            placeholder="Email"
          />

          <button
            className="admin-forgot-button primary"
            onClick={() => navigate("/admin/forgot-password/verify")}
          >
            Send link
          </button>

          <button
            className="admin-forgot-back"
            onClick={() => navigate("/admin/login")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordPage;

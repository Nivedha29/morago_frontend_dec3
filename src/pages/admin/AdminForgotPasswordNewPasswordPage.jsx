import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/AdminForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminForgotPasswordNewPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="admin-forgot-page">
      <AdminHeader />

      <div className="admin-forgot-container">
        <div className="admin-forgot-card">
          <h1 className="admin-forgot-title">Password</h1>

          <input
            className="admin-forgot-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="admin-forgot-input"
            type="password"
            placeholder="Repeat Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="admin-forgot-button primary"
            onClick={() => navigate("/admin/login")}
          >
            Save
          </button>

          <button
            className="admin-forgot-back"
            onClick={() => navigate("/admin/forgot-password/verify")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordNewPasswordPage;

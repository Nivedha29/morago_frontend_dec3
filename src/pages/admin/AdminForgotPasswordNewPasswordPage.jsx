import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/AdminForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { confirmPasswordReset } from "../../services/auth";

const AdminForgotPasswordNewPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isFormValid = password.length >= 9 && confirmPassword.length >= 9;

  const handleSavePassword = async () => {
    const resetToken = sessionStorage.getItem("resetToken");

    if (!resetToken) {
      setError("Missing reset token. Please start again.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields");
      return;
    }

    if (password.length < 9) {
      setError("Password must be at least 9 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await confirmPasswordReset({
        resetToken,
        newPassword: password,
      });

      sessionStorage.removeItem("resetPhone");
      sessionStorage.removeItem("resetToken");

      navigate("/admin/login");
    } catch (error) {
      setError(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

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
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          <input
            className="admin-forgot-input"
            type="password"
            placeholder="Repeat Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
          />

          {error && <p className="admin-forgot-error">{error}</p>}

          <button
            className="admin-forgot-button primary"
            type="button"
            disabled={isLoading}
            onClick={handleSavePassword}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>

          <button
            className="admin-forgot-back"
            type="button"
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

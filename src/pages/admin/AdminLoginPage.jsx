import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import "../../styles/AdminLoginPage.css";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phone: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = phone.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    const trimmedPhone = phone.replace(/\s+/g, "");
    const trimmedPassword = password;

    let phoneError = "";
    let passwordError = "";

    if (!trimmedPhone || !trimmedPassword) {
      phoneError = "Invalid number or password";
      passwordError = "Invalid number or password";
      setErrors({ phone: phoneError, password: passwordError });
      return;
    }

    setErrors({ phone: "", password: "" });

    try {
      setIsLoading(true);

      const data = await login({
        phone: trimmedPhone,
        password: trimmedPassword,
      });

      const hasAdminRole = Array.isArray(data.roles)
        ? data.roles.includes("ROLE_ADMIN")
        : String(data.roles).includes("ROLE_ADMIN");

      if (!hasAdminRole) {
        phoneError = "Admin account required";
        passwordError = "Admin account required";
        setErrors({ phone: phoneError, password: passwordError });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data));

      navigate("/admin/users");
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? error.message
          : "Something went wrong";

      setErrors({ phone: message, password: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-header">
        <div className="admin-logo">morago</div>
        <div className="admin-header-bar" />
      </div>

      <div className="admin-login-container">
        <div className="admin-login-card">
          <h1 className="admin-login-title">Login</h1>

          <div className="admin-login-form">
            <input
              type="text"
              placeholder="Email"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors({ phone: "", password: "" });
              }}
              className="admin-input"
            />
            {errors.phone && <p className="admin-error">{errors.phone}</p>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ phone: "", password: "" });
              }}
              className="admin-input"
            />
            {errors.password && (
              <p className="admin-error">{errors.password}</p>
            )}

            <button
              type="button"
              className="admin-login-button"
              onClick={handleLogin}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <button type="button" className="admin-forgot-button">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

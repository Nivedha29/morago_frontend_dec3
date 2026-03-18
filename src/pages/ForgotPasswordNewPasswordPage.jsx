import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import "./RegisterPage.css";
import lock from "../assets/lock.svg";

const ForgotPasswordNewPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "";
  const role = location.state?.role || "user";
  const code = location.state?.code || "";
  const resetToken = location.state?.resetToken || "";

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showPasswordMismatch =
    form.confirmPassword.trim() !== "" &&
    form.password !== form.confirmPassword;

  const showPasswordLengthError =
    form.password.trim() !== "" && form.password.length < 9;

  const isFormValid =
    form.password.trim() !== "" &&
    form.confirmPassword.trim() !== "" &&
    form.password === form.confirmPassword &&
    form.password.length >= 9;

  return (
    <div className="screen login-screen">
      <StatusBar />

      <div className="login-body">
        <div className="login-header">
          <h1 className="login-title">New password</h1>
          <p className="login-subtitle">
            Enter a new password to access your account
          </p>
        </div>

        <div className="login-form">
          <label className="register-label">Password</label>

          <div className="register-input-wrap">
            <img src={lock} alt="Password" className="register-input-icon" />
            <input
              className="register-input-with-icon"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {showPasswordLengthError && (
            <p className="register-error">
              Password must be at least 9 characters
            </p>
          )}

          <div className="register-input-wrap">
            <img src={lock} alt="Password" className="register-input-icon" />
            <input
              className="register-input-with-icon"
              type="password"
              name="confirmPassword"
              placeholder="Repeat again"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {showPasswordMismatch && (
            <p className="register-error">Passwords do not match</p>
          )}

          <button
            type="button"
            className="btn btn-login"
            disabled={!isFormValid}
            onClick={async () => {
              try {
                const response = await fetch(
                  "https://morago-api.habsida.net/publicResetPassword/reset/confirm",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      resetToken,
                      newPassword: form.password,
                    }),
                  },
                );

                const text = await response.text();

                if (!response.ok) {
                  let errorMessage = "Failed to reset password";

                  try {
                    const errorData = JSON.parse(text);
                    errorMessage = errorData.error || errorMessage;
                  } catch {
                    // keep default
                  }

                  alert(errorMessage);
                  return;
                }

                alert("Password changed successfully");
                navigate("/login");
              } catch (error) {
                console.error(error);
                alert("Something went wrong");
              }
            }}
          >
            Log in
          </button>
        </div>
      </div>

      <div className="home-indicator" />
    </div>
  );
};

export default ForgotPasswordNewPasswordPage;

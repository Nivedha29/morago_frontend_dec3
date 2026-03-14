import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";

const UserRegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="screen login-screen">
      <StatusBar />

      <div className="login-body">
        <div className="login-header">
          <h1 className="login-title">User Registration</h1>
          <p className="login-subtitle">
            Register to access all the benefits of the app
          </p>
        </div>

        <div className="login-form">
          <input
            className="login-input"
            name="phone"
            placeholder='Enter your phone number without "-"'
            value={form.phone}
            onChange={handleChange}
          />

          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            className="login-input"
            type="password"
            name="confirmPassword"
            placeholder="Repeat again"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button className="btn btn-login">Get code</button>

          <p className="login-back" onClick={() => navigate("/login")}>
            Already have an account
          </p>

          <p className="login-consent">
            By clicking the button, you consent to the processing of your
            personal data
          </p>
        </div>
      </div>

      <div className="home-indicator" />
    </div>
  );
};

export default UserRegisterPage;

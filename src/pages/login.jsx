import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import { login, normalizeRoles } from "../services/auth";
import "./Login.css";

/* ------------------------- LOGIN SCREEN ------------------------- */
const LoginScreen = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phone: "", password: "" });
  const [activeField, setActiveField] = useState(null);

  const isFormValid = phone.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    const trimmedPhone = phone.replace(/\s+/g, "");
    const trimmedPassword = password;

    let phoneError = "";
    let passwordError = "";

    if (!trimmedPhone || !trimmedPassword) {
      phoneError = "Invalid number or password";
      passwordError = "Invalid number or password";
    } else {
      try {
        const data = await login({
          phone: trimmedPhone,
          password: trimmedPassword,
        });

        const selectedRole =
          role === "translator" ? "ROLE_TRANSLATOR" : "ROLE_USER";

        const hasSelectedRole = normalizeRoles(data.roles).includes(
          selectedRole,
        );

        if (!hasSelectedRole) {
          phoneError = "Please select the correct account type";
          passwordError = "Please select the correct account type";
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("currentUser", JSON.stringify(data));

          if (selectedRole === "ROLE_TRANSLATOR") {
            navigate("/translator/home");
          } else {
            navigate("/home");
          }
          return;
        }
      } catch (error) {
        phoneError = error?.message || "Something went wrong";
        passwordError = error?.message || "Something went wrong";
      }
    }

    setErrors({ phone: phoneError, password: passwordError });
  };

  const handleKeypadClick = (digit) => {
    if (activeField === "phone") setPhone((prev) => prev + digit);
    setErrors({ phone: "", password: "" });
  };

  return (
    <div className="screen login-screen">
      <StatusBar />

      <div className="login-body">
        <div className="login-header">
          <h1 className="login-title">Log in</h1>
          <p className="login-subtitle">
            Log in to take advantage of all the app’s features
          </p>

          <div className="role-switch">
            <button
              className={
                role === "user"
                  ? "role-pill role-pill-active"
                  : "role-pill role-pill-inactive"
              }
              onClick={() => setRole("user")}
            >
              I am a user
            </button>
            <button
              className={
                role === "translator"
                  ? "role-pill role-pill-active"
                  : "role-pill role-pill-inactive"
              }
              onClick={() => setRole("translator")}
            >
              I am a translator
            </button>
          </div>
        </div>

        <div className="login-form">
          <label className="field-label">Phone number</label>
          <div
            className={`field-wrapper ${
              activeField === "phone" ? "field-focused" : ""
            } ${errors.phone ? "field-error" : ""}`}
            onClick={() => setActiveField("phone")}
          >
            <span className="field-icon phone-icon" />
            <input
              className="field-input"
              type="tel"
              placeholder="Enter your phone number without dashes"
              value={phone}
              onFocus={() => setActiveField("phone")}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors({ phone: "", password: "" });
              }}
            />
          </div>

          {errors.phone && <p className="field-error-text">{errors.phone}</p>}

          <label className="field-label">Password</label>
          <div
            className={`field-wrapper ${
              activeField === "password" ? "field-focused" : ""
            } ${errors.password ? "field-error" : ""}`}
            onClick={() => setActiveField("password")}
          >
            <span className="field-icon lock-icon" />
            <input
              className="field-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onFocus={() => setActiveField("password")}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ phone: "", password: "" });
              }}
            />
          </div>

          {errors.password && (
            <p className="field-error-text">{errors.password}</p>
          )}

          <button
            className={`btn btn-login ${!isFormValid ? "btn-disabled" : ""}`}
            onClick={handleLogin}
            disabled={!isFormValid}
          >
            Log in
          </button>

          <button
            className="btn btn-register"
            onClick={() => navigate("/sign-up")}
          >
            Register
          </button>

          <button
            className="link-forgot"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password
          </button>
        </div>
      </div>

      {/* Custom number keypad */}
      {activeField === "phone" && (
        <div className="keyboard">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
            (key, idx) => (
              <button
                key={idx}
                className={`key ${key === "" ? "key-empty" : ""}`}
                onClick={() => {
                  if (key === "⌫") setPhone((prev) => prev.slice(0, -1));
                  else if (key !== "") handleKeypadClick(key);
                }}
                disabled={key === ""}
              >
                {key}
              </button>
            ),
          )}
        </div>
      )}

      <div
        className={`home-indicator ${
          activeField === "phone" ? "home-indicator-keyboard" : ""
        }`}
      />
    </div>
  );
};

export default LoginScreen;
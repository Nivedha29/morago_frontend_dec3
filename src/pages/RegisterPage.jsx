import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";

import "./RegisterPage.css";
import call from "../assets/call.svg";
import lock from "../assets/lock.svg";
import eye from "../assets/eye.svg";

const RegisterPage = ({ role = "user" }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [activeField, setActiveField] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 3) {
      return numbers;
    }

    if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    }

    return `${numbers.slice(0, 3)} ${numbers.slice(3, 7)} ${numbers.slice(
      7,
      11,
    )}`;
  };

  const rawPhone = useMemo(() => form.phone.replace(/\D/g, ""), [form.phone]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formatted = formatPhone(value);

      setForm((prev) => ({
        ...prev,
        phone: formatted,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleKeypadClick = (digit) => {
    setForm((prev) => {
      const rawPhone = prev.phone.replace(/\D/g, "");
      const nextPhone = (rawPhone + digit).slice(0, 11);

      return {
        ...prev,
        phone: formatPhone(nextPhone),
      };
    });
  };

  const handleKeypadDelete = () => {
    setForm((prev) => {
      const rawPhone = prev.phone.replace(/\D/g, "");
      const nextPhone = rawPhone.slice(0, -1);

      return {
        ...prev,
        phone: formatPhone(nextPhone),
      };
    });
  };

  const isFormValid =
    rawPhone.length === 11 &&
    form.password.trim().length >= 9 &&
    form.confirmPassword.trim() !== "" &&
    form.password === form.confirmPassword;

  const showPasswordMismatch =
    form.confirmPassword.trim() !== "" &&
    form.password !== form.confirmPassword;

  const showPasswordLengthError =
    form.password.trim() !== "" && form.password.length < 9;

  const showPhoneError = form.phone.trim() !== "" && rawPhone.length !== 11;

  return (
    <div className="screen login-screen register-screen">
      <StatusBar />

      <button
        type="button"
        className="register-back-button"
        aria-label="Go back"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <div className="login-body register-body">
        <div className="login-header register-header">
          <p className="register-kicker">Sign up</p>

          <h1 className="register-title">
            {role === "translator" ? "Translator" : "User"}
            <br />
            Registration
          </h1>

          <p className="register-subtitle-copy">
            Enter your details to create your account.
          </p>
        </div>

        <div className="login-form register-form">
          <div className="register-field">
            <label className="register-label">Phone number</label>

            <div
              className={`register-input-wrap ${
                activeField === "phone" ? "register-input-wrap-active" : ""
              } ${showPhoneError ? "register-input-wrap-error" : ""}`}
            >
              <img src={call} alt="Phone" className="register-input-icon" />

              <input
                className={`register-phone-input ${
                  form.phone ? "has-value" : ""
                }`}
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onFocus={() => setActiveField("phone")}
                readOnly
              />
            </div>
          </div>

          {showPhoneError && (
            <p className="register-error">Invalid number format</p>
          )}

          <label className="register-label">Password</label>

          <div
            className={`register-input-wrap register-input-wrap-password ${
              activeField === "password" ? "register-input-wrap-active" : ""
            } ${showPasswordLengthError ? "register-input-wrap-error" : ""}`}
          >
            <img src={lock} alt="Password" className="register-input-icon" />

            <input
              className="register-input-with-icon register-input-password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setActiveField("password")}
            />

            <button
              type="button"
              className="register-eye-button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <img src={eye} alt="" className="register-eye-icon" />
            </button>
          </div>

          {showPasswordLengthError && (
            <p className="register-error">
              Password must be at least 9 characters
            </p>
          )}

          <div
            className={`register-input-wrap register-input-wrap-password ${
              activeField === "confirmPassword"
                ? "register-input-wrap-active"
                : ""
            } ${showPasswordMismatch ? "register-input-wrap-error" : ""}`}
          >
            <img src={lock} alt="Password" className="register-input-icon" />

            <input
              className="register-input-with-icon register-input-password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              onFocus={() => setActiveField("confirmPassword")}
            />

            <button
              type="button"
              className="register-eye-button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              <img src={eye} alt="" className="register-eye-icon" />
            </button>
          </div>

          {showPasswordMismatch && (
            <p className="register-error">Passwords do not match</p>
          )}

          <button
            type="button"
            className="btn btn-login register-submit-button"
            disabled={!isFormValid}
            onClick={() =>
              navigate("/verify", {
                state: {
                  phone: form.phone,
                  password: form.password,
                  role,
                },
              })
            }
          >
            Get Code
          </button>

          <button
            type="button"
            className="login-back register-login-link"
            onClick={() => navigate("/login")}
          >
            Already have an account
          </button>
        </div>
      </div>

      {activeField === "phone" && (
        <div className="register-keyboard">
          {[
            { value: "1", sub: "" },
            { value: "2", sub: "ABC" },
            { value: "3", sub: "DEF" },
            { value: "4", sub: "GHI" },
            { value: "5", sub: "JKL" },
            { value: "6", sub: "MNO" },
            { value: "7", sub: "PQRS" },
            { value: "8", sub: "TUV" },
            { value: "9", sub: "WXYZ" },
            { value: "", sub: "" },
            { value: "0", sub: "" },
            { value: "⌫", sub: "" },
          ].map((key, idx) => (
            <button
              key={idx}
              type="button"
              className={`register-key ${
                key.value === "" ? "register-key-empty" : ""
              }`}
              onClick={() => {
                if (key.value === "⌫") {
                  handleKeypadDelete();
                } else if (key.value !== "") {
                  handleKeypadClick(key.value);
                }
              }}
              disabled={key.value === ""}
            >
              <span className="register-key-main">{key.value}</span>
              {key.sub && <span className="register-key-sub">{key.sub}</span>}
            </button>
          ))}
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

export default RegisterPage;
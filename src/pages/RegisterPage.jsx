import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";

import "./RegisterPage.css";
import call from "../assets/call.svg";
import lock from "../assets/lock.svg";

const RegisterPage = ({ role = "user" }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [activeField, setActiveField] = useState(null);

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
    form.phone.trim() !== "" &&
    form.password.trim() !== "" &&
    form.confirmPassword.trim() !== "" &&
    form.password === form.confirmPassword;

  const showPasswordMismatch =
    form.confirmPassword.trim() !== "" &&
    form.password !== form.confirmPassword;

  const showPasswordLengthError =
    form.password.trim() !== "" && form.password.length < 9;

  const showPhoneError =
    form.phone.trim() !== "" && form.phone.replace(/\D/g, "").length !== 11;

  return (
    <div className="screen login-screen">
      <StatusBar />

      <div className="login-body">
        <div className="login-header">
          <h1 className="login-title">
            {role === "translator" ? "Translator" : "User"} <br />
            Registration
          </h1>

          <p className="login-subtitle">
            Register to access all the benefits of the app
          </p>
        </div>

        <div className="login-form">
          {/* PHONE NUMBER */}
          <div className="register-field">
            <label className="register-label">Phone number</label>

            <div className="register-input-wrap">
              <img src={call} alt="Phone" className="register-input-icon" />

              <input
                className={`register-phone-input ${
                  form.phone ? "has-value" : ""
                }`}
                name="phone"
                placeholder='Enter your phone number without "-"'
                value={form.phone}
                onFocus={() => setActiveField("phone")}
                readOnly
              />
            </div>
          </div>

          {showPhoneError && (
            <p className="register-error">Invalid number format</p>
          )}

          {/* PASSWORD */}
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
              onFocus={() => setActiveField("password")}
            />
          </div>

          {showPasswordLengthError && (
            <p className="register-error">
              Password must be at least 9 characters
            </p>
          )}

          {/* CONFIRM PASSWORD */}
          <div className="register-input-wrap">
            <img src={lock} alt="Password" className="register-input-icon" />

            <input
              className="register-input-with-icon"
              type="password"
              name="confirmPassword"
              placeholder="Repeat again"
              value={form.confirmPassword}
              onChange={handleChange}
              onFocus={() => setActiveField("confirmPassword")}
            />
          </div>

          {showPasswordMismatch && (
            <p className="register-error">Passwords do not match</p>
          )}

          <button
            className="btn btn-login"
            disabled={!isFormValid}
            onClick={() => navigate("/verify")}
          >
            Get code
          </button>

          <p className="login-back" onClick={() => navigate("/login")}>
            Already have an account
          </p>

          <p className="login-consent">
            By clicking the button, you consent to the processing of your
            personal data
          </p>
        </div>
      </div>

      {/* CUSTOM KEYPAD */}
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import RegisterKeyboard from "../components/RegisterKeyboard";

import "../index.css";
import "./TranslatorRegisterPage.css";

const TranslatorRegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [activeField, setActiveField] = useState(null);

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);

    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    }

    return `${numbers.slice(0, 3)} ${numbers.slice(3, 7)} ${numbers.slice(7, 11)}`;
  };

  const getRawPhone = (value) => value.replace(/\D/g, "");

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      setForm((prev) => ({
        ...prev,
        phone: formatPhone(value),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneKeyClick = (digit) => {
    setForm((prev) => {
      const nextPhone = `${getRawPhone(prev.phone)}${digit}`.slice(0, 11);

      return {
        ...prev,
        phone: formatPhone(nextPhone),
      };
    });
  };

  const handlePhoneDelete = () => {
    setForm((prev) => {
      const nextPhone = getRawPhone(prev.phone).slice(0, -1);

      return {
        ...prev,
        phone: formatPhone(nextPhone),
      };
    });
  };

  const rawPhone = getRawPhone(form.phone);

  const showPhoneError = form.phone.trim() !== "" && rawPhone.length !== 11;
  const showPasswordLengthError =
    form.password.trim() !== "" && form.password.length < 9;
  const showPasswordMismatch =
    form.confirmPassword.trim() !== "" &&
    form.password !== form.confirmPassword;

  const isFormValid =
    rawPhone.length === 11 &&
    form.password.trim() !== "" &&
    form.confirmPassword.trim() !== "" &&
    form.password.length >= 9 &&
    form.password === form.confirmPassword;

  const handleSubmit = () => {
    if (!isFormValid) return;

    navigate("/verify", {
      state: {
        phone: rawPhone,
        password: form.password,
        role: "translator",
      },
    });
  };

  return (
    <div className="screen login-screen translator-register">
      <StatusBar />

      <div className="login-body translator-register__body">
        <div className="translator-register__header">
          <h1 className="login-title">
            Translator <br />
            Registration
          </h1>

          <p className="login-subtitle">
            Register to access all the benefits of the app
          </p>
        </div>

        <div className="translator-register__form">
          <div className="translator-register__field">
            <label className="field-label">Phone number</label>

            <div
              className={`field-wrapper ${
                activeField === "phone" ? "field-focused" : ""
              } ${showPhoneError ? "field-error" : ""}`}
            >
              <div className="field-icon phone-icon" />

              <input
                className="field-input"
                type="text"
                name="phone"
                placeholder='Enter your phone number without "-"'
                value={form.phone}
                onFocus={() => setActiveField("phone")}
                onBlur={() => setActiveField(null)}
                onChange={handleChange}
                readOnly
              />
            </div>

            {showPhoneError && (
              <p className="field-error-text">Invalid number format</p>
            )}
          </div>

          <div className="translator-register__field">
            <label className="field-label">Password</label>

            <div
              className={`field-wrapper ${
                activeField === "password" ? "field-focused" : ""
              } ${showPasswordLengthError ? "field-error" : ""}`}
            >
              <div className="field-icon lock-icon" />

              <input
                className="field-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setActiveField("password")}
                onBlur={() => setActiveField(null)}
              />
            </div>

            {showPasswordLengthError && (
              <p className="field-error-text">
                Password must be at least 9 characters
              </p>
            )}
          </div>

          <div className="translator-register__field">
            <label className="field-label">Confirm password</label>

            <div
              className={`field-wrapper ${
                activeField === "confirmPassword" ? "field-focused" : ""
              } ${showPasswordMismatch ? "field-error" : ""}`}
            >
              <div className="field-icon lock-icon" />

              <input
                className="field-input"
                type="password"
                name="confirmPassword"
                placeholder="Repeat again"
                value={form.confirmPassword}
                onChange={handleChange}
                onFocus={() => setActiveField("confirmPassword")}
                onBlur={() => setActiveField(null)}
              />
            </div>

            {showPasswordMismatch && (
              <p className="field-error-text">Passwords do not match</p>
            )}
          </div>

          <button
            type="button"
            className="btn btn-login translator-register__submit"
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Get code
          </button>

          <button
            type="button"
            className="translator-register__back-link"
            onClick={() => navigate("/login")}
          >
            Already have an account
          </button>

          <p className="translator-register__consent">
            By clicking the button, you consent to the processing of your
            personal data
          </p>
        </div>
      </div>

      {activeField === "phone" && (
        <RegisterKeyboard
          onDigitClick={handlePhoneKeyClick}
          onDelete={handlePhoneDelete}
        />
      )}

      <div
        className={`home-indicator ${
          activeField === "phone" ? "home-indicator-keyboard" : ""
        }`}
      />
    </div>
  );
};

export default TranslatorRegisterPage;

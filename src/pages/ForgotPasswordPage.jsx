import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import { requestPasswordResetCode } from "../services/auth";

import "./RegisterPage.css";
import call from "../assets/call.svg";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [phone, setPhone] = useState("");
  const [activeField, setActiveField] = useState(null);

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 7)} ${numbers.slice(7, 11)}`;
  };

  const handleKeypadClick = (digit) => {
    const rawPhone = phone.replace(/\D/g, "");
    const nextPhone = (rawPhone + digit).slice(0, 11);
    setPhone(formatPhone(nextPhone));
  };

  const handleKeypadDelete = () => {
    const rawPhone = phone.replace(/\D/g, "");
    const nextPhone = rawPhone.slice(0, -1);
    setPhone(formatPhone(nextPhone));
  };

  const isPhoneValid = phone.replace(/\D/g, "").length === 11;

  return (
    <div className="screen login-screen">
      <StatusBar />

      <div className="login-body">
        <div className="login-header">
          <h1 className="login-title">Restore password</h1>
          <p className="login-subtitle">
            Enter your phone number to reset your password
          </p>

          <div className="role-switch">
            <button
              type="button"
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
              type="button"
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
          <div className="register-field">
            <label className="register-label">Phone number</label>

            <div className="register-input-wrap">
              <img src={call} alt="Phone" className="register-input-icon" />

              <input
                className={`register-phone-input ${phone ? "has-value" : ""}`}
                name="phone"
                placeholder='Enter your phone number without "-"'
                value={phone}
                onFocus={() => setActiveField("phone")}
                readOnly
              />
            </div>
          </div>

          <button
            type="button"
            className="btn btn-login"
            disabled={!isPhoneValid}
            onClick={async () => {
              try {
                await requestPasswordResetCode({
                  phone: phone.replace(/\s+/g, ""),
                });

                navigate("/forgot-password/verify", {
                  state: {
                    phone: phone.replace(/\s+/g, ""),
                    role,
                  },
                });
              } catch (error) {
                const errorMessage =
                  error && typeof error === "object" && "message" in error
                    ? error.message
                    : "Failed to request reset code";

                alert(errorMessage);
              }
            }}
          >
            Reset password
          </button>

          <button
            type="button"
            className="btn btn-register"
            onClick={() => navigate("/login")}
          >
            Back
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
              className={`register-key ${key.value === "" ? "register-key-empty" : ""}`}
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

export default ForgotPasswordPage;

import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import MobileKeyboard from "../components/MobileKeyboard.jsx";
import SuccessModal from "../components/SuccessModal.jsx";
import { register } from "../services/auth.js";

import "../index.css";
import "./../styles/MobileTranslatorVerifyPage.css";

const CODE_LENGTH = 4;
const INITIAL_TIME_LEFT = 159;

const MobileTranslatorVerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone || "";
  const password = location.state?.password || "";
  const confirmPassword = location.state?.confirmPassword || "";
  const role = location.state?.role || "ROLE_TRANSLATOR";

  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [activeField, setActiveField] = useState("code");
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_LEFT);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const inputRefs = useRef([]);

  const isCodeComplete = code.every((digit) => digit !== "");

  useEffect(() => {
    if (!phone || !password || !confirmPassword || !role) {
      navigate("/mobile/translator-register", { replace: true });
    }
  }, [phone, password, confirmPassword, role, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const focusInput = (index) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const nextCode = [...code];
    nextCode[index] = value;
    setCode(nextCode);
    setActiveIndex(index);

    if (value && index < CODE_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key !== "Backspace") return;

    if (code[index]) {
      const nextCode = [...code];
      nextCode[index] = "";
      setCode(nextCode);
      setActiveIndex(index);
      return;
    }

    if (index > 0) {
      focusInput(index - 1);
      setActiveIndex(index - 1);
    }
  };

  const handleKeypadClick = (value) => {
    const firstEmptyIndex = code.findIndex((digit) => digit === "");
    if (firstEmptyIndex === -1) return;

    const nextCode = [...code];
    nextCode[firstEmptyIndex] = value;
    setCode(nextCode);
    setActiveIndex(firstEmptyIndex);

    if (firstEmptyIndex < CODE_LENGTH - 1) {
      focusInput(firstEmptyIndex + 1);
    }
  };

  const handleKeypadDelete = () => {
    let lastFilledIndex = -1;

    for (let i = CODE_LENGTH - 1; i >= 0; i--) {
      if (code[i] !== "") {
        lastFilledIndex = i;
        break;
      }
    }

    if (lastFilledIndex === -1) return;

    const nextCode = [...code];
    nextCode[lastFilledIndex] = "";
    setCode(nextCode);
    setActiveIndex(lastFilledIndex);
    focusInput(lastFilledIndex);
  };

  const handleConfirm = async () => {
    if (!isCodeComplete || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const data = await register({
        phone: phone.replace(/\s+/g, ""),
        password,
        confirmPassword,
        role,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data));

      setShowSuccess(true);
    } catch (error) {
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? error.message
          : "Registration failed";

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = () => {
    setCode(Array(CODE_LENGTH).fill(""));
    setTimeLeft(INITIAL_TIME_LEFT);
    setIsExpired(false);
    setActiveIndex(0);
    focusInput(0);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="screen mobile-translator-verify">
      <StatusBar />

      <div className="mobile-translator-verify__content">
        <button
          type="button"
          className="mobile-translator-verify__back-button"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <div className="mobile-translator-verify__card">
          <h1 className="mobile-translator-verify__title">Verification code</h1>

          <p className="mobile-translator-verify__subtitle">
            We have sent a verification code <br />
            to your phone number
          </p>

          <div className="mobile-translator-verify__code-container">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`mobile-translator-verify__code-input ${
                  activeIndex === index
                    ? "mobile-translator-verify__code-input--active"
                    : ""
                }`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onFocus={() => {
                  setActiveField("code");
                  setActiveIndex(index);
                }}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <p className="mobile-translator-verify__timer">
            {minutes}:{seconds}
          </p>

          <button
            type="button"
            className="btn btn-login mobile-translator-verify__confirm-button"
            disabled={isExpired ? false : !isCodeComplete || isSubmitting}
            onClick={isExpired ? handleResend : handleConfirm}
          >
            {isExpired
              ? "Resend Code"
              : isSubmitting
                ? "Confirming..."
                : "Confirm"}
          </button>

          <p className="mobile-translator-verify__resend">
            Didn’t receive the code? Try again
          </p>
        </div>
      </div>

      {showSuccess && (
        <SuccessModal
          title="Registration was successful"
          subtitle="You can now fully enjoy all the features"
          buttonText="Hello!"
          onButtonClick={() => navigate("/translator/profile-setup")}
        />
      )}

      {activeField === "code" && !showSuccess && (
        <MobileKeyboard
          onDigitClick={handleKeypadClick}
          onDelete={handleKeypadDelete}
        />
      )}

      <div
        className={`home-indicator ${
          activeField === "code" ? "home-indicator-keyboard" : ""
        }`}
      />
    </div>
  );
};

export default MobileTranslatorVerifyPage;

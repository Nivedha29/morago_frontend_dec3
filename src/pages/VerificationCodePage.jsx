import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";

import "./VerificationCodePage.css";

const VerificationCodePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [activeField, setActiveField] = useState("code");

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // 👉 move to next input
    if (value && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key !== "Backspace") return;

    if (code[index]) {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      return;
    }

    if (index > 0) {
      setTimeout(() => {
        inputRefs.current[index - 1]?.focus();
      }, 0);
    }
  };

  const handleKeypadClick = (value) => {
    const firstEmptyIndex = code.findIndex((digit) => digit === "");

    if (firstEmptyIndex === -1) return;

    const newCode = [...code];
    newCode[firstEmptyIndex] = value;
    setActiveIndex(firstEmptyIndex);
    setCode(newCode);

    if (firstEmptyIndex < code.length - 1) {
      setTimeout(() => {
        inputRefs.current[firstEmptyIndex + 1]?.focus();
      }, 0);
    } else {
      setTimeout(() => {
        inputRefs.current[firstEmptyIndex]?.focus();
      }, 0);
    }
  };

  const handleKeypadDelete = () => {
    let lastFilledIndex = -1;

    for (let i = code.length - 1; i >= 0; i--) {
      if (code[i] !== "") {
        lastFilledIndex = i;
        break;
      }
    }

    if (lastFilledIndex === -1) return;

    const newCode = [...code];
    newCode[lastFilledIndex] = "";
    setActiveIndex(lastFilledIndex);
    setCode(newCode);

    setTimeout(() => {
      inputRefs.current[lastFilledIndex]?.focus();
    }, 0);
  };
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="screen">
      <StatusBar />

      <div className="page-content">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>

        <div className="auth-card">
          <h1 className="auth-title">Verification code</h1>
          <p className="auth-subtitle">
            We have sent a verification code to your phone number
          </p>

          {/* CODE INPUTS */}
          <div className="code-container">
            {code.map((digit, index) => (
              <input
                id={`code-${index}`}
                ref={(el) => (inputRefs.current[index] = el)}
                key={index}
                className={`code-input ${
                  activeIndex === index ? "code-input-active" : ""
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

          <p className="timer">02:39</p>

          <button
            className="primary-button"
            onClick={() => navigate("/success")}
          >
            Confirm
          </button>

          <p className="resend">Didn’t receive the code? Try again</p>

          {activeField === "code" && (
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
                  {key.sub && (
                    <span className="register-key-sub">{key.sub}</span>
                  )}
                </button>
              ))}
            </div>
          )}

          <div
            className={`home-indicator ${
              activeField === "code" ? "home-indicator-keyboard" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default VerificationCodePage;

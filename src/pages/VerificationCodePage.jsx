import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";

const VerificationCodePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

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
                key={index}
                className="code-input"
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
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
        </div>
      </div>
    </div>
  );
};

export default VerificationCodePage;
import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/AdminForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { verifyPasswordResetCode } from "../../services/auth";

const AdminForgotPasswordVerifyPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);
    setError("");

    if (value && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyCode = async () => {
    const phone = sessionStorage.getItem("resetPhone");
    const joinedCode = code.join("");

    if (!phone) {
      setError("Missing phone number. Please start again.");
      return;
    }

    if (joinedCode.length !== 4) {
      setError("Enter the 4-digit code");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const resetToken = await verifyPasswordResetCode({
        phone,
        code: joinedCode,
      });

      sessionStorage.setItem("resetToken", resetToken);
      navigate("/admin/forgot-password/new-password");
    } catch (error) {
      setError(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (code[index]) {
        const updatedCode = [...code];
        updatedCode[index] = "";
        setCode(updatedCode);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="admin-forgot-page">
      <AdminHeader showProfile={false} />

      <div className="admin-forgot-container">
        <div className="admin-forgot-card">
          <h1 className="admin-forgot-title">Verify Code</h1>

          <div className="admin-code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="admin-code-box"
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          {error && <p className="admin-forgot-error">{error}</p>}

          <button
            className="admin-forgot-button primary"
            type="button"
            disabled={isLoading}
            onClick={handleVerifyCode}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>

          <button
            className="admin-forgot-back"
            type="button"
            onClick={() => navigate("/admin/forgot-password")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordVerifyPage;

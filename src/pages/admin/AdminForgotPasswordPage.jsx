import { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/AdminForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { requestPasswordResetCode } from "../../services/auth";

const AdminForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    }
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 7)} ${numbers.slice(7, 11)}`;
  };

  const isPhoneValid = phone.replace(/\D/g, "").length === 11;

  const handleRequestReset = async () => {
    const rawPhone = phone.replace(/\D/g, "");

    if (!isPhoneValid) {
      setError("Enter a valid phone number");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await requestPasswordResetCode({
        phone: rawPhone,
      });

      sessionStorage.setItem("resetPhone", rawPhone);
      navigate("/admin/forgot-password/verify");
    } catch (error) {
      setError(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-forgot-page">
      <AdminHeader />
      <div className="admin-forgot-container">
        <div className="admin-forgot-card">
          <h1 className="admin-forgot-title">Request pass</h1>

          <input
            className="admin-forgot-input"
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value).slice(0, 13));
              setError("");
            }}
          />

          {error && <p className="admin-forgot-error">{error}</p>}

          <button
            className="admin-forgot-button primary"
            type="button"
            disabled={!isPhoneValid || isLoading}
            onClick={handleRequestReset}
          >
            {isLoading ? "Sending..." : "Send link"}
          </button>

          <button
            className="admin-forgot-back"
            onClick={() => navigate("/admin/login")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import { createTranslator } from "../../../services/admin";
import "../../../styles/Admin/TranslatorPages/AddTranslatorPage.css";

const AddTranslatorPage = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!errorMessage) return;

    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!phone || !password || !confirmPassword) {
      setErrorMessage("Phone, password, and confirm password are required");
      return;
    }

    if (password.length < 9) {
      setErrorMessage("Password must be at least 9 characters");
      return;
    }

    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      setErrorMessage("Password must contain letters and numbers");
      return;
    }

    if (!/^\d{11}$/.test(phone)) {
      setErrorMessage("Phone number must be 11 digits");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);

      await createTranslator({
        phone,
        password,
        confirmPassword,
      });

      navigate("/admin/translators");
    } catch (apiError) {
      const backendMessage =
        apiError?.message ||
        apiError?.details?.error ||
        apiError?.details?.message ||
        "Failed to create translator";

      setErrorMessage(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <AdminPageShell
        title="Add translator"
        showControls={false}
        breadcrumbs={[
          { label: "Lists" },
          { label: "Translators", path: "/admin/translators" },
          { label: "Add translator" },
        ]}
      >
        <div className="add-translator-page">
          <div className="add-translator-card">
            <form className="add-translator-form" onSubmit={handleSubmit}>
              <div className="add-translator-row">
                <div className="add-translator-field">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="add-translator-row">
                <div className="add-translator-field">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div className="add-translator-row">
                <div className="add-translator-field">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="add-translator-error-message">{errorMessage}</p>
              )}

              <div className="add-translator-actions">
                <button
                  type="button"
                  className="add-translator-btn add-translator-btn-cancel"
                  onClick={() => navigate("/admin/translators")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="add-translator-btn add-translator-btn-save"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
};

export default AddTranslatorPage;

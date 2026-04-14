import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdminUser } from "../../../services/adminUser";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import "../../../styles/Admin/UserPages/AddUserPage.css";

const AddUserPage = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveUser = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!phone.trim()) {
      setErrorMessage("Phone is required");
      return;
    }

    if (!password) {
      setErrorMessage("Password is required");
      return;
    }

    if (!confirmPassword) {
      setErrorMessage("Confirm password is required");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);

      await createAdminUser({
        phone: phone.trim(),
        password,
        confirmPassword,
      });

      navigate("/admin/users");
    } catch (apiError) {
      console.error("Failed to create user:", apiError);

      const backendMessage =
        apiError?.message ||
        apiError?.details?.error ||
        apiError?.details?.message ||
        "Failed to create user";

      setErrorMessage(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <AdminPageShell
        title="Add User"
        showControls={false}
        breadcrumbs={[
          { label: "Lists" },
          { label: "Users", path: "/admin/users" },
          { label: "Add User" },
        ]}
      >
        <div className="add-user-page">
          <div className="add-user-card">
            <form className="add-user-form" onSubmit={handleSaveUser}>
              <div className="add-user-field">
                <label className="add-user-label">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="add-user-input"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="add-user-field">
                <label className="add-user-label">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="add-user-input"
                  placeholder="Enter password"
                />
              </div>

              <div className="add-user-field">
                <label className="add-user-label">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="add-user-input"
                  placeholder="Confirm password"
                />
              </div>

              {errorMessage && (
                <p className="add-user-error-message">{errorMessage}</p>
              )}

              <div className="add-user-actions">
                <button
                  type="button"
                  className="add-user-cancel-btn"
                  onClick={() => navigate("/admin/users")}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-user-save-btn"
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

export default AddUserPage;

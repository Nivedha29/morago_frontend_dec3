import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminUserById, updateAdminUser } from "../../../services/adminUser";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import "../../../styles/Admin/UserPages/EditUserPage.css";

const EditUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getAdminUserById(Number(id));

        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setPhone(data.phone || "");
        setEmail(data.email || "");
        setIsActive(Boolean(data.isActive));
      } catch (apiError) {
        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to load user";

        setErrorMessage(backendMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSaveUser = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("First name and last name are required");
      return;
    }

    if (!phone.trim()) {
      setErrorMessage("Phone is required");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Email is required");
      return;
    }

    try {
      setIsSubmitting(true);

      await updateAdminUser(Number(id), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        isActive,
      });

      navigate("/admin/users");
    } catch (apiError) {
      const backendMessage =
        apiError?.message ||
        apiError?.details?.error ||
        apiError?.details?.message ||
        "Failed to update user";

      setErrorMessage(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <AdminPageShell
        title="Edit User"
        showControls={false}
        breadcrumbs={[
          { label: "Lists" },
          { label: "Users", path: "/admin/users" },
          { label: "Edit User" },
        ]}
      >
        <div className="edit-user-page">
          <div className="edit-user-card">
            {isLoading ? (
              <p className="edit-user-loading">Loading user...</p>
            ) : (
              <form className="edit-user-form" onSubmit={handleSaveUser}>
                <div className="edit-user-field">
                  <label className="edit-user-label">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="edit-user-input"
                    placeholder="Enter first name"
                    aria-label="First name"
                  />
                </div>

                <div className="edit-user-field">
                  <label className="edit-user-label">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="edit-user-input"
                    placeholder="Enter last name"
                    aria-label="Last name"
                  />
                </div>

                <div className="edit-user-field">
                  <label className="edit-user-label">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="edit-user-input"
                    placeholder="Enter phone number"
                    aria-label="Phone"
                  />
                </div>

                <div className="edit-user-field">
                  <label className="edit-user-label">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="edit-user-input"
                    placeholder="Enter email"
                    aria-label="Email"
                  />
                </div>

                <div className="edit-user-field">
                  <label className="edit-user-label">Status</label>
                  <select
                    value={String(isActive)}
                    onChange={(e) => setIsActive(e.target.value === "true")}
                    className="edit-user-input"
                    aria-label="User status"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>

                {errorMessage && (
                  <p className="edit-user-error-message">{errorMessage}</p>
                )}

                <div className="edit-user-actions">
                  <button
                    type="button"
                    className="edit-user-cancel-btn"
                    onClick={() => navigate("/admin/users")}
                    disabled={isSubmitting}
                    aria-label="Cancel editing user"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="edit-user-save-btn"
                    disabled={isSubmitting}
                    aria-label="Save user changes"
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
};

export default EditUserPage;

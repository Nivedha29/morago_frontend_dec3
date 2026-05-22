import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import {
  getTranslatorById,
  updateTranslatorById,
} from "../../../services/admin";
import "../../../styles/Admin/TranslatorPages/EditTranslatorPage.css";

const EditTranslatorPage = () => {
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
    const fetchTranslator = async () => {
      try {
        setIsLoading(true);

        const translator = await getTranslatorById(Number(id));

        setFirstName(translator.firstName || "");
        setLastName(translator.lastName || "");
        setPhone(translator.phone || "");
        setEmail(translator.email || "");
        setIsActive(Boolean(translator.isActive));
      } catch (apiError) {
        const backendMessage =
          apiError?.message ||
          apiError?.details?.error ||
          apiError?.details?.message ||
          "Failed to load translator";

        setErrorMessage(backendMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslator();
  }, [id]);

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

    if (!firstName || !lastName || !phone || !email) {
      setErrorMessage("First name, last name, phone, and email are required");
      return;
    }

    try {
      setIsSubmitting(true);

      await updateTranslatorById(Number(id), {
        firstName,
        lastName,
        phone,
        email,
        isActive,
      });

      navigate("/admin/translators");
    } catch (apiError) {
      const backendMessage =
        apiError?.message ||
        apiError?.details?.error ||
        apiError?.details?.message ||
        "Failed to update translator";

      setErrorMessage(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <AdminPageShell
        title="Edit translator"
        showControls={false}
        breadcrumbs={[
          { label: "Lists" },
          { label: "Translators", path: "/admin/translators" },
          { label: "Edit translator" },
        ]}
      >
        <div className="edit-translator-page">
          <div className="edit-translator-card">
            {isLoading ? (
              <p className="edit-translator-loading">Loading translator...</p>
            ) : (
              <form className="edit-translator-form" onSubmit={handleSubmit}>
                <div className="edit-translator-row">
                  <div className="edit-translator-field">
                    <label htmlFor="edit-translator-first-name">
                      First name
                    </label>
                    <input
                      id="edit-translator-first-name"
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      aria-label="First name"
                    />
                  </div>

                  <div className="edit-translator-field">
                    <label htmlFor="edit-translator-last-name">Last name</label>
                    <input
                      id="edit-translator-last-name"
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="family-name"
                      aria-label="Last name"
                    />
                  </div>
                </div>

                <div className="edit-translator-row">
                  <div className="edit-translator-field">
                    <label htmlFor="edit-translator-phone">Phone</label>
                    <input
                      id="edit-translator-phone"
                      type="text"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      aria-label="Phone"
                    />
                  </div>

                  <div className="edit-translator-field">
                    <label htmlFor="edit-translator-email">Email</label>
                    <input
                      id="edit-translator-email"
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      aria-label="Email"
                    />
                  </div>
                </div>

                <div className="edit-translator-row">
                  <div className="edit-translator-field">
                    <label htmlFor="edit-translator-status">Status</label>
                    <select
                      id="edit-translator-status"
                      value={String(isActive)}
                      onChange={(e) => setIsActive(e.target.value === "true")}
                      aria-label="Translator status"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>

                {errorMessage && (
                  <p className="edit-translator-error-message">
                    {errorMessage}
                  </p>
                )}

                <div className="edit-translator-actions">
                  <button
                    type="button"
                    className="edit-translator-btn edit-translator-btn-cancel"
                    onClick={() => navigate("/admin/translators")}
                    aria-label="Cancel editing translator"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="edit-translator-btn edit-translator-btn-save"
                    disabled={isSubmitting}
                    aria-label="Save translator changes"
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

export default EditTranslatorPage;

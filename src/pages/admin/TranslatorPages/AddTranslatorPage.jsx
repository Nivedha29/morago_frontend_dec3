import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminPageShell from "../../../components/admin/AdminPageShell";
import { createTranslator } from "../../../services/admin";
import "../../../styles/AddTranslatorPage.css";

const AddTranslatorPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [topikLevel, setTopikLevel] = useState("");
  const [languages, setLanguages] = useState([]);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [theme, setTheme] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTopikOpen, setIsTopikOpen] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const topikRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (topikRef.current && !topikRef.current.contains(event.target)) {
        setIsTopikOpen(false);
      }

      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!errorMessage) return;

    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleArrowClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

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
        breadcrumbSection="Lists"
        breadcrumbPage="Translators / Add translator"
        showControls={false}
      >
        <div className="add-translator-page">
          <div className="add-translator-card">
            <form className="add-translator-form" onSubmit={handleSubmit}>
              <div className="add-translator-top">
                <div className="add-translator-photo-box">
                  <button
                    type="button"
                    className="add-translator-photo-button"
                    onClick={handleArrowClick}
                  >
                    ↑
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>

                <div className="add-translator-photo-preview">
                  {selectedFile ? selectedFile.name : ""}
                </div>
              </div>

              <div className="add-translator-row">
                <div className="add-translator-field">
                  <label>Full Name</label>
                  <div className="add-translator-name-group">
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Surname" />
                  </div>
                </div>
              </div>

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

              <div className="add-translator-row">
                <div className="add-translator-field">
                  <label>Birth</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="add-translator-row">
                <div className="add-translator-field">
                  <label>TOPIK</label>
                  <div className="custom-dropdown" ref={topikRef}>
                    <button
                      type="button"
                      className="custom-dropdown-trigger"
                      onClick={() => setIsTopikOpen((prev) => !prev)}
                    >
                      <span>{topikLevel || "Level"}</span>
                      <span
                        className={`custom-dropdown-arrow ${isTopikOpen ? "open" : ""}`}
                      >
                        ▾
                      </span>
                    </button>

                    {isTopikOpen && (
                      <div className="custom-dropdown-menu">
                        {[
                          "Level 1",
                          "Level 2",
                          "Level 3",
                          "Level 4",
                          "Level 5",
                          "Level 6",
                        ].map((level) => (
                          <button
                            key={level}
                            type="button"
                            className={`custom-dropdown-option ${
                              topikLevel === level ? "selected" : ""
                            }`}
                            onClick={() => {
                              setTopikLevel(level);
                              setIsTopikOpen(false);
                            }}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="add-translator-row">
                <div className="add-translator-field">
                  <label>Language</label>

                  <div className="custom-dropdown" ref={langRef}>
                    <button
                      type="button"
                      className="custom-dropdown-trigger"
                      onClick={() => setIsLangOpen((prev) => !prev)}
                    >
                      <span>
                        {languages.length > 0
                          ? languages.map((l) => l.toUpperCase()).join(", ")
                          : "Select languages"}
                      </span>
                      <span
                        className={`custom-dropdown-arrow ${isLangOpen ? "open" : ""}`}
                      >
                        ▾
                      </span>
                    </button>

                    {isLangOpen && (
                      <div className="custom-dropdown-menu">
                        {["ru", "en", "ko", "uz"].map((lang) => (
                          <label key={lang} className="custom-multi-option">
                            <input
                              type="checkbox"
                              checked={languages.includes(lang)}
                              onChange={() => {
                                if (languages.includes(lang)) {
                                  setLanguages(
                                    languages.filter((l) => l !== lang),
                                  );
                                } else {
                                  setLanguages([...languages, lang]);
                                }
                              }}
                            />
                            <span>{lang.toUpperCase()}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="add-translator-row">
                <div className="add-translator-field">
                  <label>Translation's topics</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value="">Theme</option>
                    <option value="theme1">Theme 1</option>
                    <option value="theme2">Theme 2</option>
                    <option value="theme3">Theme 3</option>
                    <option value="theme4">Theme 4</option>
                  </select>
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

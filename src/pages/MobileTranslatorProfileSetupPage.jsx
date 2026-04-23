import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import {
  fillTranslatorProfile,
  getActiveLanguages,
  getTranslatorThemes,
  uploadAvatar,
} from "../services/mobileTranslator.js";

import "../index.css";
import "./../styles/MobileTranslatorProfileSetupPage.css";

const MobileTranslatorProfileSetupPage = () => {
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);
  const topikInputRef = useRef(null);

  const storedUser = useMemo(() => {
    const rawUser = localStorage.getItem("currentUser");

    if (!rawUser) return null;

    try {
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  }, []);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [levelOfKorean, setLevelOfKorean] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [topikFileName, setTopikFileName] = useState("");
  const [themes, setThemes] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedThemeIds, setSelectedThemeIds] = useState([]);
  const [selectedLanguageIds, setSelectedLanguageIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!storedUser?.token) {
      navigate("/mobile/translator-login", { replace: true });
      return;
    }

    const initialFullName = [storedUser.firstName, storedUser.lastName]
      .filter(Boolean)
      .join(" ");

    setFullName(initialFullName);
    setPhone(storedUser.phone || "");
    setDateOfBirth(storedUser.dateOfBirth || "");
    setImageUrl(storedUser.imageUrl || "");
    setLevelOfKorean(
      storedUser.levelOfKorean !== undefined &&
        storedUser.levelOfKorean !== null &&
        storedUser.levelOfKorean !== 0
        ? String(storedUser.levelOfKorean)
        : "",
    );
    setSelectedThemeIds(storedUser.selectedThemeIds || []);
    setSelectedLanguageIds(storedUser.selectedLanguageIds || []);
  }, [storedUser, navigate]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const [themesResponse, languagesResponse] = await Promise.all([
          getTranslatorThemes({
            page: 0,
            size: 100,
            sortBy: "id",
            sortDirection: "ASC",
          }),
          getActiveLanguages(),
        ]);

        setThemes(themesResponse.content || []);
        setLanguages(languagesResponse || []);
      } catch (error) {
        const message =
          error && typeof error === "object" && "message" in error
            ? error.message
            : "Failed to load profile setup data";

        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const isSaveDisabled =
    isSubmitting ||
    isUploadingAvatar ||
    !fullName.trim() ||
    !dateOfBirth ||
    !levelOfKorean ||
    selectedThemeIds.length === 0 ||
    selectedLanguageIds.length === 0;

  const handleThemeToggle = (themeId) => {
    setSelectedThemeIds((prev) =>
      prev.includes(themeId)
        ? prev.filter((id) => id !== themeId)
        : [...prev, themeId],
    );
  };

  const handleLanguageToggle = (languageId) => {
    setSelectedLanguageIds((prev) =>
      prev.includes(languageId)
        ? prev.filter((id) => id !== languageId)
        : [...prev, languageId],
    );
  };

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setIsUploadingAvatar(true);
      setErrorMessage("");

      const uploadedFile = await uploadAvatar(file);
      setImageUrl(uploadedFile.path || "");
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? error.message
          : "Failed to upload avatar";

      setErrorMessage(message);
    } finally {
      setIsUploadingAvatar(false);
      event.target.value = "";
    }
  };

  const handleTopikClick = () => {
    topikInputRef.current?.click();
  };

  const handleTopikChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setTopikFileName(file.name);
    event.target.value = "";
  };

  const handleSave = async () => {
    if (isSaveDisabled) return;

    const trimmedName = fullName.trim();
    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ");

    if (!firstName || !lastName) {
      setErrorMessage("Please enter your first and last name");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await fillTranslatorProfile({
        firstName,
        lastName,
        imageUrl,
        levelOfKorean: Number(levelOfKorean),
        dateOfBirth,
        themeIds: selectedThemeIds,
        languageIds: selectedLanguageIds,
      });

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...(storedUser || {}),
          ...response,
          imageUrl,
          selectedThemeIds: response.themes?.map((theme) => theme.id) || [],
          selectedLanguageIds:
            response.languages?.map((language) => language.id) || [],
        }),
      );

      navigate("/translator/home", { replace: true });
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? error.message
          : "Failed to complete profile";

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="screen mobile-translator-profile-setup">
      <StatusBar />

      <div className="mobile-translator-profile-setup__content">
        <button
          type="button"
          className="mobile-translator-profile-setup__back-button"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <div className="mobile-translator-profile-setup__card">
          <h1 className="mobile-translator-profile-setup__title">
            Complete your profile
          </h1>

          <div className="mobile-translator-profile-setup__avatar-section">
            <div className="mobile-translator-profile-setup__avatar-wrapper">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="mobile-translator-profile-setup__avatar-image"
                />
              ) : (
                <div className="mobile-translator-profile-setup__avatar-placeholder" />
              )}

              <button
                type="button"
                className="mobile-translator-profile-setup__avatar-trigger"
                onClick={handleAvatarClick}
                disabled={isUploadingAvatar}
              >
                {isUploadingAvatar ? "..." : "📷"}
              </button>

              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="mobile-translator-profile-setup__hidden-input"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <label className="field-label">Full name</label>
          <div className="field-wrapper">
            <input
              type="text"
              className="field-input"
              placeholder="Enter your first and last name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <label className="field-label">Phone number</label>
          <div className="field-wrapper">
            <input type="text" className="field-input" value={phone} disabled />
          </div>

          <label className="field-label">Date of birth</label>
          <div className="field-wrapper">
            <input
              type="date"
              className="field-input"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          <label className="field-label">Korean level (TOPIK)</label>
          <div className="field-wrapper">
            <select
              className="field-input mobile-translator-profile-setup__select"
              value={levelOfKorean}
              onChange={(e) => setLevelOfKorean(e.target.value)}
            >
              <option value="">Enter your Korean level</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
              <option value="5">Level 5</option>
              <option value="6">Level 6</option>
            </select>
          </div>

          <button
            type="button"
            className="mobile-translator-profile-setup__upload-button"
            onClick={handleTopikClick}
          >
            {topikFileName || "Upload TOPIK photo"}
          </button>

          <input
            ref={topikInputRef}
            type="file"
            accept="image/*,.pdf"
            className="mobile-translator-profile-setup__hidden-input"
            onChange={handleTopikChange}
          />

          <div className="mobile-translator-profile-setup__section">
            <h2 className="mobile-translator-profile-setup__section-title">
              Topics for translation
            </h2>

            <div className="mobile-translator-profile-setup__topics-list">
              {loading ? (
                <p className="mobile-translator-profile-setup__helper-text">
                  Loading topics...
                </p>
              ) : (
                themes.map((theme) => (
                  <label
                    key={theme.id}
                    className="mobile-translator-profile-setup__topic-row"
                  >
                    <input
                      type="checkbox"
                      className="mobile-translator-profile-setup__topic-checkbox"
                      checked={selectedThemeIds.includes(theme.id)}
                      onChange={() => handleThemeToggle(theme.id)}
                    />
                    <span className="mobile-translator-profile-setup__topic-text">
                      {theme.titleEn || theme.title || theme.name}
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="mobile-translator-profile-setup__section">
            <h2 className="mobile-translator-profile-setup__section-title">
              Topics for translation with certificate
            </h2>

            <div className="mobile-translator-profile-setup__certificate-box">
              Certificate upload is not supported by the current API yet.
            </div>
          </div>

          <div className="mobile-translator-profile-setup__section">
            <h2 className="mobile-translator-profile-setup__section-title">
              Available translation languages
            </h2>

            <div className="mobile-translator-profile-setup__languages">
              {loading ? (
                <p className="mobile-translator-profile-setup__helper-text">
                  Loading languages...
                </p>
              ) : (
                languages.map((language) => (
                  <button
                    key={language.id}
                    type="button"
                    className={`mobile-translator-profile-setup__language-chip ${
                      selectedLanguageIds.includes(language.id)
                        ? "mobile-translator-profile-setup__language-chip--active"
                        : ""
                    }`}
                    onClick={() => handleLanguageToggle(language.id)}
                  >
                    {language.titleEn || language.name}
                  </button>
                ))
              )}
            </div>
          </div>

          {errorMessage ? (
            <p className="field-error-text">{errorMessage}</p>
          ) : null}

          <button
            type="button"
            className="btn btn-login"
            disabled={isSaveDisabled}
            onClick={handleSave}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>

          <p className="mobile-translator-profile-setup__agreement">
            By clicking the button, you consent to the processing of your
            personal data.
          </p>
        </div>
      </div>

      <div className="home-indicator" />
    </div>
  );
};

export default MobileTranslatorProfileSetupPage;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import SuccessModal from "../components/SuccessModal.jsx";
import defaultAvatar from "../assets/avatar.svg";
import {
  fillTranslatorProfile,
  getActiveLanguages,
  getTranslatorThemes,
  uploadAvatar,
} from "../services/mobileTranslator.js";

import "../index.css";
import "./../styles/MobileTranslatorProfileSetupPage.css";

const INITIAL_THEME_COUNT = 6;

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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [levelOfKorean, setLevelOfKorean] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [topikFileName, setTopikFileName] = useState("");
  const [themes, setThemes] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedThemeIds, setSelectedThemeIds] = useState([]);
  const [selectedLanguageIds, setSelectedLanguageIds] = useState([]);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!storedUser?.token) {
      navigate("/mobile/translator-login", { replace: true });
      return;
    }

    setFirstName(storedUser.firstName || "");
    setLastName(storedUser.lastName || "");
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

  const visibleThemes = showAllThemes
    ? themes
    : themes.slice(0, INITIAL_THEME_COUNT);

  const shouldShowThemeToggle = themes.length > INITIAL_THEME_COUNT;

  const isSaveDisabled =
    isSubmitting ||
    isUploadingAvatar ||
    !firstName.trim() ||
    !lastName.trim() ||
    !dateOfBirth ||
    !levelOfKorean ||
    selectedThemeIds.length === 0 ||
    selectedLanguageIds.length === 0;

  const handleThemeToggle = (themeId) => {
    setErrorMessage("");
    setSelectedThemeIds((prev) =>
      prev.includes(themeId)
        ? prev.filter((id) => id !== themeId)
        : [...prev, themeId],
    );
  };

  const handleLanguageToggle = (languageId) => {
    setErrorMessage("");
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

    setErrorMessage("");
    setTopikFileName(file.name);
    event.target.value = "";
  };

  const handleSave = async () => {
    if (isSaveDisabled) return;

    if (!firstName.trim()) {
      setErrorMessage("First name is required");
      return;
    }

    if (!lastName.trim()) {
      setErrorMessage("Last name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await fillTranslatorProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
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

      setShowSuccess(true);
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
              <img
                src={imageUrl || defaultAvatar}
                alt="Profile"
                className="mobile-translator-profile-setup__avatar-image"
              />

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

          <label className="field-label">First name</label>
          <div className="field-wrapper">
            <input
              type="text"
              className="field-input"
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>

          <label className="field-label">Last name</label>
          <div className="field-wrapper">
            <input
              type="text"
              className="field-input"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setErrorMessage("");
              }}
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
              onChange={(e) => {
                setDateOfBirth(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>

          <label className="field-label">Korean level (TOPIK)</label>
          <div className="field-wrapper">
            <select
              className="field-input mobile-translator-profile-setup__select"
              value={levelOfKorean}
              onChange={(e) => {
                setLevelOfKorean(e.target.value);
                setErrorMessage("");
              }}
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
                visibleThemes.map((theme) => (
                  <div
                    key={theme.id}
                    className="mobile-translator-profile-setup__topic-row"
                    onClick={() => handleThemeToggle(theme.id)}
                  >
                    <input
                      type="checkbox"
                      className="mobile-translator-profile-setup__topic-checkbox"
                      checked={selectedThemeIds.includes(theme.id)}
                      readOnly
                    />
                    <span className="mobile-translator-profile-setup__topic-text">
                      {theme.titleEn || theme.title || theme.name}
                    </span>
                  </div>
                ))
              )}
            </div>

            {shouldShowThemeToggle ? (
              <button
                type="button"
                className="mobile-translator-profile-setup__show-more"
                onClick={() => setShowAllThemes((prev) => !prev)}
              >
                {showAllThemes ? "Show less" : "Show more"}
              </button>
            ) : null}
          </div>

          <div className="mobile-translator-profile-setup__section">
            <h2 className="mobile-translator-profile-setup__section-title">
              Topics for translation with certificate
            </h2>

            <div className="mobile-translator-profile-setup__certificate-list">
              <div className="mobile-translator-profile-setup__certificate-row">
                <span className="mobile-translator-profile-setup__topic-text">
                  Upload certificates for selected topics
                </span>

                <button
                  type="button"
                  className="mobile-translator-profile-setup__certificate-upload"
                  onClick={handleTopikClick}
                >
                  {topikFileName ? "1 file" : "Upload"}
                </button>
              </div>
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

      {showSuccess && (
        <SuccessModal
          title={
            <>
              We have sent an SMS with a <br />
              link to schedule an interview
            </>
          }
          subtitle="If you haven't received it, please call 010 2530 8575"
          buttonText="Great!"
          onButtonClick={() => navigate("/onboarding", { replace: true })}
        />
      )}

      <div className="home-indicator" />
    </div>
  );
};

export default MobileTranslatorProfileSetupPage;

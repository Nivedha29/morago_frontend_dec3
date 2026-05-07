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
import "../styles/TranslatorProfileSetupPage.css";

const THEME_PAGE_SIZE = 6;

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  } catch {
    return null;
  }
};

const getErrorMessage = (error, fallback) =>
  error && typeof error === "object" && "message" in error
    ? error.message
    : fallback;

const TranslatorProfileSetupPage = () => {
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);

  const storedUser = useMemo(getStoredUser, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [levelOfKorean, setLevelOfKorean] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [themes, setThemes] = useState([]);
  const [themePage, setThemePage] = useState(0);
  const [totalThemePages, setTotalThemePages] = useState(1);
  const [languages, setLanguages] = useState([]);
  const [selectedThemeIds, setSelectedThemeIds] = useState([]);
  const [selectedLanguageIds, setSelectedLanguageIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMoreThemes, setIsLoadingMoreThemes] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const clearError = () => setErrorMessage("");

  const fetchThemes = async (page = 0) => {
    const response = await getTranslatorThemes({
      page,
      size: THEME_PAGE_SIZE,
      sortBy: "id",
      sortDirection: "ASC",
    });

    setThemes((prev) =>
      page === 0
        ? response.content || []
        : [...prev, ...(response.content || [])],
    );
    setThemePage(response.page ?? page);
    setTotalThemePages(response.totalPages ?? 1);
  };

  useEffect(() => {
    if (!storedUser?.token) {
      navigate("/login", { replace: true });
      return;
    }

    setFirstName(storedUser.firstName || "");
    setLastName(storedUser.lastName || "");
    setPhone(storedUser.phone || "");
    setDateOfBirth(storedUser.dateOfBirth || "");
    setImageUrl(storedUser.imageUrl || "");
    setLevelOfKorean(
      storedUser.levelOfKorean ? String(storedUser.levelOfKorean) : "",
    );
    setSelectedThemeIds(storedUser.selectedThemeIds || []);
    setSelectedLanguageIds(storedUser.selectedLanguageIds || []);
  }, [storedUser, navigate]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        clearError();

        const languagesResponse = await getActiveLanguages();
        setLanguages(languagesResponse || []);

        await fetchThemes(0);
      } catch (error) {
        setErrorMessage(
          getErrorMessage(error, "Failed to load profile setup data"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const hasMoreThemes = themePage + 1 < totalThemePages;

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
    clearError();

    setSelectedThemeIds((prev) =>
      prev.includes(themeId)
        ? prev.filter((id) => id !== themeId)
        : [...prev, themeId],
    );
  };

  const handleLanguageToggle = (languageId) => {
    clearError();

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
      clearError();

      const uploadedFile = await uploadAvatar(file);
      setImageUrl(uploadedFile.path || "");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Failed to upload avatar"));
    } finally {
      setIsUploadingAvatar(false);
      event.target.value = "";
    }
  };

  const handleLoadMoreThemes = async () => {
    if (!hasMoreThemes || isLoadingMoreThemes) return;

    try {
      setIsLoadingMoreThemes(true);
      clearError();

      await fetchThemes(themePage + 1);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Failed to load more topics"));
    } finally {
      setIsLoadingMoreThemes(false);
    }
  };

  const handleSave = async () => {
    if (isSaveDisabled) return;

    try {
      setIsSubmitting(true);
      clearError();

      const response = await fillTranslatorProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        imageUrl,
        levelOfKorean: Number(levelOfKorean),
        dateOfBirth,
        themeIds: selectedThemeIds,
        languageIds: selectedLanguageIds,
      });

      const updatedUser = {
        ...(storedUser || {}),
        ...response,
        imageUrl,
        selectedThemeIds: response.themes?.map((theme) => theme.id) || [],
        selectedLanguageIds:
          response.languages?.map((language) => language.id) || [],
      };

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Failed to complete profile"));
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
          aria-label="Go back to previous page"
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
                alt="Translator profile"
                className="mobile-translator-profile-setup__avatar-image"
              />

              <button
                type="button"
                className="mobile-translator-profile-setup__avatar-trigger"
                onClick={handleAvatarClick}
                disabled={isUploadingAvatar}
                aria-label="Upload profile photo"
              >
                {isUploadingAvatar ? "..." : ""}
              </button>

              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="mobile-translator-profile-setup__hidden-input"
                onChange={handleAvatarChange}
                aria-label="Choose profile photo"
              />
            </div>
          </div>

          <label className="field-label" htmlFor="translator-first-name">
            First name
          </label>
          <div className="field-wrapper">
            <input
              id="translator-first-name"
              type="text"
              className="field-input"
              placeholder="First name"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
                clearError();
              }}
            />
          </div>

          <label className="field-label" htmlFor="translator-last-name">
            Last name
          </label>
          <div className="field-wrapper">
            <input
              id="translator-last-name"
              type="text"
              className="field-input"
              placeholder="Last name"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
                clearError();
              }}
            />
          </div>

          <label className="field-label" htmlFor="translator-phone">
            Phone number
          </label>
          <div className="field-wrapper">
            <input
              id="translator-phone"
              type="text"
              className="field-input"
              value={phone}
              disabled
            />
          </div>

          <label className="field-label" htmlFor="translator-date-of-birth">
            Date of birth
          </label>
          <div className="field-wrapper">
            <input
              id="translator-date-of-birth"
              type="date"
              className="field-input"
              value={dateOfBirth}
              onChange={(event) => {
                setDateOfBirth(event.target.value);
                clearError();
              }}
            />
          </div>

          <label className="field-label" htmlFor="translator-korean-level">
            Korean level (TOPIK)
          </label>
          <div className="field-wrapper">
            <select
              id="translator-korean-level"
              className="field-input mobile-translator-profile-setup__select"
              value={levelOfKorean}
              onChange={(event) => {
                setLevelOfKorean(event.target.value);
                clearError();
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
                themes.map((theme) => {
                  const isSelected = selectedThemeIds.includes(theme.id);
                  const themeName = theme.titleEn || theme.title || theme.name;

                  return (
                    <button
                      key={theme.id}
                      type="button"
                      className="mobile-translator-profile-setup__topic-row"
                      onClick={() => handleThemeToggle(theme.id)}
                      aria-pressed={isSelected}
                    >
                      <input
                        type="checkbox"
                        className="mobile-translator-profile-setup__topic-checkbox"
                        checked={isSelected}
                        readOnly
                        tabIndex={-1}
                      />
                      <span className="mobile-translator-profile-setup__topic-text">
                        {themeName}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {hasMoreThemes && (
              <button
                type="button"
                className="mobile-translator-profile-setup__show-more"
                onClick={handleLoadMoreThemes}
                disabled={isLoadingMoreThemes}
              >
                {isLoadingMoreThemes ? "Loading..." : "Show more"}
              </button>
            )}
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
                languages.map((language) => {
                  const isSelected = selectedLanguageIds.includes(language.id);

                  return (
                    <button
                      key={language.id}
                      type="button"
                      className={`mobile-translator-profile-setup__language-chip ${
                        isSelected
                          ? "mobile-translator-profile-setup__language-chip--active"
                          : ""
                      }`}
                      onClick={() => handleLanguageToggle(language.id)}
                      aria-pressed={isSelected}
                    >
                      {language.titleEn || language.name}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {errorMessage && (
            <p className="field-error-text" aria-live="polite">
              {errorMessage}
            </p>
          )}

          <button
            type="button"
            className="btn btn-login mobile-translator-profile-setup__submit"
            disabled={isSaveDisabled}
            onClick={handleSave}
            aria-label="Save translator profile"
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
          role="ROLE_TRANSLATOR"
          onButtonClick={() => navigate("/login", { replace: true })}
        />
      )}

      <div className="home-indicator" />
    </div>
  );
};

export default TranslatorProfileSetupPage;

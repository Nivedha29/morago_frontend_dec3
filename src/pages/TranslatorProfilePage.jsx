import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import defaultAvatar from "../assets/avatar.svg";
import {
  deleteAvatar,
  getActiveLanguages,
  getCurrentUserProfile,
  getTranslatorThemes,
  patchTranslatorProfile,
  updateProfilePassword,
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

const MobileTranslatorProfilePage = () => {
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

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [isLoadingMoreThemes, setIsLoadingMoreThemes] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isDeletingAvatar, setIsDeletingAvatar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

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

    const fetchProfileData = async () => {
      try {
        setLoading(true);
        clearError();

        const [profile, languagesResponse] = await Promise.all([
          getCurrentUserProfile(),
          getActiveLanguages(),
          fetchThemes(0),
        ]);

        setFirstName(profile.firstName || "");
        setLastName(profile.lastName || "");
        setPhone(profile.phone || "");

        setDateOfBirth(storedUser.dateOfBirth || "");
        setImageUrl(storedUser.imageUrl || "");
        setLevelOfKorean(
          storedUser.levelOfKorean ? String(storedUser.levelOfKorean) : "",
        );
        setSelectedThemeIds(storedUser.selectedThemeIds || []);
        setSelectedLanguageIds(storedUser.selectedLanguageIds || []);
        setLanguages(languagesResponse || []);
      } catch (error) {
        setErrorMessage(getErrorMessage(error, "Failed to load profile"));
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [storedUser, navigate]);

  const hasMoreThemes = themePage + 1 < totalThemePages;

  const isSaveDisabled =
    isSubmitting ||
    isUploadingAvatar ||
    isDeletingAvatar ||
    !firstName.trim() ||
    !lastName.trim() ||
    !dateOfBirth ||
    !levelOfKorean ||
    selectedThemeIds.length === 0 ||
    selectedLanguageIds.length === 0;

  const isPasswordDisabled =
    isChangingPassword ||
    !oldPassword.trim() ||
    !newPassword.trim() ||
    !confirmPassword.trim();

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

  const handleDeleteAvatar = async () => {
    try {
      setIsDeletingAvatar(true);
      clearError();

      await deleteAvatar();
      setImageUrl("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Failed to delete avatar"));
    } finally {
      setIsDeletingAvatar(false);
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

      const response = await patchTranslatorProfile({
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
      navigate("/translator-home");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Failed to update profile"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordMessage("");

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New password and confirm password do not match");
      return;
    }

    try {
      setIsChangingPassword(true);

      await updateProfilePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Password updated successfully");
    } catch (error) {
      setPasswordMessage(getErrorMessage(error, "Failed to update password"));
    } finally {
      setIsChangingPassword(false);
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
          <h1 className="mobile-translator-profile-setup__title">My Profile</h1>

          <div className="mobile-translator-profile-setup__avatar-section">
            <div className="mobile-translator-profile-setup__avatar-wrapper">
              <img
                src={imageUrl || defaultAvatar}
                alt="Translator profile"
                className="mobile-translator-profile-setup__avatar-image"
                onError={(event) => {
                  event.currentTarget.src = defaultAvatar;
                }}
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

            {imageUrl && (
              <button
                type="button"
                className="mobile-translator-profile-setup__show-more"
                onClick={handleDeleteAvatar}
                disabled={isDeletingAvatar}
                aria-label="Delete profile photo"
              >
                {isDeletingAvatar ? "Deleting..." : "Delete photo"}
              </button>
            )}
          </div>

          <label
            className="field-label"
            htmlFor="translator-profile-first-name"
          >
            First name
          </label>
          <div className="field-wrapper">
            <input
              id="translator-profile-first-name"
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

          <label className="field-label" htmlFor="translator-profile-last-name">
            Last name
          </label>
          <div className="field-wrapper">
            <input
              id="translator-profile-last-name"
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

          <label className="field-label" htmlFor="translator-profile-phone">
            Phone number
          </label>
          <div className="field-wrapper">
            <input
              id="translator-profile-phone"
              type="text"
              className="field-input"
              value={phone}
              disabled
            />
          </div>

          <label
            className="field-label"
            htmlFor="translator-profile-date-of-birth"
          >
            Date of birth
          </label>
          <div className="field-wrapper">
            <input
              id="translator-profile-date-of-birth"
              type="date"
              className="field-input"
              value={dateOfBirth}
              onChange={(event) => {
                setDateOfBirth(event.target.value);
                clearError();
              }}
            />
          </div>

          <label
            className="field-label"
            htmlFor="translator-profile-korean-level"
          >
            Korean level (TOPIK)
          </label>
          <div className="field-wrapper">
            <select
              id="translator-profile-korean-level"
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

          <div className="mobile-translator-profile-setup__section">
            <h2 className="mobile-translator-profile-setup__section-title">
              Change password
            </h2>

            <label className="field-label" htmlFor="translator-old-password">
              Old password
            </label>
            <div className="field-wrapper">
              <input
                id="translator-old-password"
                type="password"
                className="field-input"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                placeholder="Old password"
              />
            </div>

            <label className="field-label" htmlFor="translator-new-password">
              New password
            </label>
            <div className="field-wrapper">
              <input
                id="translator-new-password"
                type="password"
                className="field-input"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="New password"
              />
            </div>

            <label
              className="field-label"
              htmlFor="translator-confirm-password"
            >
              Confirm password
            </label>
            <div className="field-wrapper">
              <input
                id="translator-confirm-password"
                type="password"
                className="field-input"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm password"
              />
            </div>

            {passwordMessage && (
              <p className="field-error-text" aria-live="polite">
                {passwordMessage}
              </p>
            )}

            <button
              type="button"
              className="btn btn-login mobile-translator-profile-setup__submit"
              disabled={isPasswordDisabled}
              onClick={handleChangePassword}
              aria-label="Change password"
            >
              {isChangingPassword ? "Saving..." : "Change password"}
            </button>
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
            {isSubmitting ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>

      <div className="home-indicator" />
    </div>
  );
};

export default MobileTranslatorProfilePage;

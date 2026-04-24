import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import MobileBottomNav from "../components/MobileBottomNav.jsx";

import defaultAvatar from "../assets/avatar.svg";
import notificationIcon from "../assets/notification.svg";
import homeBaseImage from "../assets/Base.jpg";

import {
  getCurrentUserBalance,
  getTranslatorCallHistory,
  getUnreadNotificationsCount,
  switchTranslatorStatus,
} from "../services/mobileTranslator.js";

import "../index.css";
import "./../styles/MobileTranslatorProfileSetupPage.css";

const MobileTranslatorHomePage = () => {
  const navigate = useNavigate();

  const storedUser = useMemo(() => {
    const rawUser = localStorage.getItem("currentUser");
    if (!rawUser) return null;

    try {
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  }, []);

  const [balance, setBalance] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [callHistory, setCallHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(
    typeof storedUser?.isOnline === "boolean" ? storedUser.isOnline : true,
  );
  const [loading, setLoading] = useState(true);
  const [callHistoryError, setCallHistoryError] = useState("");
  const [isSwitchingStatus, setIsSwitchingStatus] = useState(false);
  const [statusError, setStatusError] = useState("");

  useEffect(() => {
    if (!storedUser?.token) {
      navigate("/mobile/translator-login", { replace: true });
    }
  }, [storedUser, navigate]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setCallHistoryError("");

        const [balanceResponse, notificationsResponse, callsResponse] =
          await Promise.all([
            getCurrentUserBalance(),
            getUnreadNotificationsCount(),
            getTranslatorCallHistory({
              isLast: true,
              page: 0,
              size: 3,
              sortBy: "id",
              sortDirection: "DESC",
            }),
          ]);

        setBalance(balanceResponse || 0);
        setNotificationCount(notificationsResponse || 0);
        setCallHistory(callsResponse?.content || []);
      } catch (error) {
        setCallHistoryError(error?.message || "Failed to load call history");
        setCallHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [storedUser]);

  const handleStatusToggle = async () => {
    if (isSwitchingStatus) return;

    try {
      setIsSwitchingStatus(true);
      setStatusError("");

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
          isOnline: nextIsOnline,
        }),
      );
    } catch (error) {
      setStatusError(error?.message || "Failed to update translator status");
    } finally {
      setIsSwitchingStatus(false);
    }
  };

  return (
    <div className="screen mobile-translator-home">
      <div
        className="mobile-translator-home__background"
        style={{ backgroundImage: `url(${homeBaseImage})` }}
      />

      <div className="mobile-translator-home__foreground">
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

          <div className="mobile-translator-home__history-section">
            <h2 className="mobile-translator-home__history-title">
              Call history
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
    </div>
  );
};

export default MobileTranslatorHomePage;

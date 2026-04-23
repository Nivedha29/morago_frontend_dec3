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
  getCurrentUserProfile,
  getTranslatorCallHistory,
  getUnreadNotificationsCount,
  switchTranslatorStatus,
} from "../services/mobileTranslator.js";

import "../index.css";
import "../styles/MobileTranslatorHomePage.css";

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

  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [callHistory, setCallHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(
    typeof storedUser?.isOnline === "boolean" ? storedUser.isOnline : true,
  );
  const [loading, setLoading] = useState(true);
  const [isSwitchingStatus, setIsSwitchingStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!storedUser?.token) {
      navigate("/mobile/translator-login", { replace: true });
    }
  }, [storedUser, navigate]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const [
          balanceResponse,
          notificationsResponse,
          callsResponse,
          meResponse,
        ] = await Promise.all([
          getCurrentUserBalance(),
          getUnreadNotificationsCount(),
          getTranslatorCallHistory({
            isLast: true,
            page: 0,
            size: 3,
            sortBy: "id",
            sortDirection: "DESC",
          }),
          getCurrentUserProfile(),
        ]);

        setBalance(balanceResponse || 0);
        setNotificationCount(notificationsResponse || 0);
        setCallHistory(callsResponse?.content || []);
        setProfile(meResponse || null);

        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            ...(storedUser || {}),
            ...meResponse,
            isOnline,
          }),
        );
      } catch (error) {
        setErrorMessage(
          error?.message || "Failed to load translator home data",
        );
        setCallHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [storedUser, isOnline]);

  const handleStatusToggle = async () => {
    if (isSwitchingStatus) return;

    try {
      setIsSwitchingStatus(true);
      setErrorMessage("");

      const response = await switchTranslatorStatus();
      const nextIsOnline = response.isOnline;

      setIsOnline(nextIsOnline);

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...(storedUser || {}),
          ...(profile || {}),
          isOnline: nextIsOnline,
        }),
      );
    } catch (error) {
      setErrorMessage(error?.message || "Failed to update translator status");
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

        <div className="mobile-translator-home__content">
          <div className="mobile-translator-home__hero">
            <div className="mobile-translator-home__hero-top">
              <div className="mobile-translator-home__logo">morago</div>

              <button
                type="button"
                className="mobile-translator-home__notification-button"
              >
                <img
                  src={notificationIcon}
                  alt="Notifications"
                  className="mobile-translator-home__notification-icon"
                />

                {notificationCount > 0 && (
                  <span className="mobile-translator-home__notification-badge">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </span>
                )}
              </button>
            </div>

            <BalanceCard
              balance={balance}
              loading={loading}
              onClick={() => navigate("/translator/wallet")}
            />

            <div className="mobile-translator-home__status-wrap">
              <button
                type="button"
                className={`mobile-translator-home__status-toggle ${
                  isOnline
                    ? "mobile-translator-home__status-toggle--online"
                    : "mobile-translator-home__status-toggle--offline"
                }`}
                onClick={handleStatusToggle}
                disabled={isSwitchingStatus}
              >
                <span className="mobile-translator-home__status-track">
                  <span className="mobile-translator-home__status-option">
                    Available
                  </span>
                  <span className="mobile-translator-home__status-option">
                    Not available
                  </span>
                </span>

                <span className="mobile-translator-home__status-thumb">
                  {isOnline ? "Available" : "Not available"}
                </span>
              </button>
            </div>
          </div>

          <div className="mobile-translator-home__history-section">
            <h2 className="mobile-translator-home__history-title">
              Call history
            </h2>

            {loading ? (
              <div className="mobile-translator-home__history-empty">
                Loading call history...
              </div>
            ) : errorMessage ? (
              <div className="mobile-translator-home__history-empty">
                Failed to load call history
              </div>
            ) : callHistory.length === 0 ? (
              <div className="mobile-translator-home__history-empty">
                No call history
              </div>
            ) : (
              <div className="mobile-translator-home__history-list">
                {callHistory.map((call, index) => (
                  <button
                    key={`${call.date}-${call.phone}-${index}`}
                    type="button"
                    className="mobile-translator-home__history-item"
                  >
                    <img
                      src={call.imageUrl || defaultAvatar}
                      alt={call.name || "Caller"}
                      className="mobile-translator-home__history-avatar"
                    />

                    <div className="mobile-translator-home__history-main">
                      <span className="mobile-translator-home__history-name">
                        {call.name || call.phone}
                      </span>
                      <span className="mobile-translator-home__history-theme">
                        {call.theme || "Call"}
                      </span>
                    </div>

                    <div className="mobile-translator-home__history-side">
                      <span className="mobile-translator-home__history-date">
                        {call.date || ""}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <MobileBottomNav activeTab="home" />
        <div className="home-indicator" />
      </div>
    </div>
  );
};

export default MobileTranslatorHomePage;

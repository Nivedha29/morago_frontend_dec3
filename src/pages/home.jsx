import React, { useEffect, useState } from "react";
import StatusBar from "../components/StatusBar.jsx";

import coinIcon from "../assets/coin icon.svg";
import fallbackIcon from "../assets/category.svg";
import fallbackAvatar from "../assets/avatar.svg";
import freeCallBanner from "../assets/Banner - free call.svg";

import { getUserHomeData } from "../services/user.js";

export default function HomeScreen() {
  const [showFirstCall, setShowFirstCall] = useState(true);
  const [showFundsModal, setShowFundsModal] = useState(false);

  const [balance, setBalance] = useState(0);
  const [topics, setTopics] = useState([]);
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    let mounted = true;

    getUserHomeData()
      .then(({ balance, topics, calls }) => {
        if (!mounted) return;

        setBalance(balance ?? 0);
        setTopics(topics ?? []);
        setCalls(calls ?? []);
      })
      .catch((error) => {
        console.error("Home API error:", error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleCallClick = () => {
    if (balance <= 0) {
      setShowFundsModal(true);
    }
  };

  return (
    <div className="screen user-home">
      <div className="home-head">
        <StatusBar />

        <div className="home-top">
          <span />
          <b>morago</b>
          <button>⌕</button>
        </div>

        <div className="balance-card">
          <div className="balance-row">
            <div>
              <p>My balance</p>

              <h2 className={balance < 0 ? "minus-balance" : ""}>
                <img src={coinIcon} alt="coin" className="coin-icon" />
                {Number(balance).toLocaleString()}
                <span>-0 min</span>
              </h2>
            </div>

            <button
              className="topup-btn"
              onClick={() => setShowFundsModal(true)}
            >
              Top up
              <span>+</span>
            </button>
          </div>

          <button className="call-btn" onClick={handleCallClick}>
            Select a translator and call
          </button>
        </div>
      </div>

      <main className="home-content">
        <h3>Popular translation topics</h3>

        <div className="topic-grid">
          {topics.map((topic) => {
            const title = topic.name || topic.title || "Topic";
            const icon = topic.iconUrl || topic.iconURL || fallbackIcon;

            return (
              <button key={topic.id || title}>
                <span className="topic-icon">
                  <img
                    src={icon}
                    alt={title}
                    onError={(e) => {
                      e.currentTarget.src = fallbackIcon;
                    }}
                  />
                </span>
                <b>{title}</b>
              </button>
            );
          })}
        </div>

        <h3>My recent calls</h3>

        {calls.map((call) => {
          const name = call.name || call.phone || "Unknown user";
          const topic = call.theme || "-";
          const duration = call.duration ? `${call.duration}` : "-";
          const rating = Number(call.rating) || 0;

          const avatar =
            call.imageURL ||
            call.imageUrl ||
            call.avatarURL ||
            call.avatarUrl ||
            fallbackAvatar;

          return (
            <div className="call-item" key={call.id || `${name}-${call.date}`}>
              <img
                className="avatar"
                src={avatar}
                alt={name}
                onError={(e) => {
                  e.currentTarget.src = fallbackAvatar;
                }}
              />

              <div>
                <b>{name}</b>
                <p>{topic}</p>
              </div>

              <div className="rate">
                {"⭐".repeat(rating)}
                <small>{duration}</small>
              </div>
            </div>
          );
        })}
      </main>

      <nav className="bottom-nav">
        {["Home", "My calls", "Message", "Profile"].map((item, i) => (
          <button key={item} className={i === 0 ? "active" : ""}>
            <span>{["⌂", "☏", "▢", "♙"][i]}</span>
            {item}
          </button>
        ))}
      </nav>

      {showFirstCall && (
        <div className="first-call">
          <div className="first-box">
            <h2>FIRST CALL FREE!</h2>
            <p>Try the Morago Translator service on us</p>

            <img
              className="free-call-img"
              src={freeCallBanner}
              alt="Free Call Banner"
            />

            <button onClick={() => setShowFirstCall(false)}>Try</button>
          </div>
        </div>
      )}

      {showFundsModal && (
        <div className="first-call">
          <div className="funds-box">
            <h3>Insufficient funds</h3>
            <p>Top up your balance</p>

            <div className="funds-actions">
              <button onClick={() => setShowFundsModal(false)}>Later</button>
              <button onClick={() => setShowFundsModal(false)}>Top up</button>
            </div>
          </div>
        </div>
      )}

      <div className="home-indicator" />
    </div>
  );
}
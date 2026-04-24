import React, { useState } from "react";
import StatusBar from "../components/StatusBar.jsx";

import coinIcon from "../assets/coin icon.svg";

import bankIcon from "../assets/dollar-circle.svg";
import taxiIcon from "../assets/map.svg";
import mailIcon from "../assets/box.svg";
import documentIcon from "../assets/sms-tracking.svg";
import financeIcon from "../assets/wallet-2.svg";
import othersIcon from "../assets/category.svg";

import caller1 from "../assets/Caller Image.svg";
import caller2 from "../assets/Caller Image (1).svg";
import caller3 from "../assets/Caller Image (2).svg";

import freeCallBanner from "../assets/Banner - free call.svg";

const topics = [
  ["Bank", bankIcon],
  ["Taxi", taxiIcon],
  ["Mail", mailIcon],
  ["Documents", documentIcon],
  ["Finances", financeIcon],
  ["Others", othersIcon],
];

const calls = [
  ["K. Dmitry", "Bank", "04:25", caller1],
  ["P. Natalia", "Mail", "02:16", caller2],
  ["L. Min Ho", "Insurance", "03:03", caller3],
];

export default function HomeScreen() {
  const [showFirstCall, setShowFirstCall] = useState(true);
  const [showFundsModal, setShowFundsModal] = useState(false);
  const [balance, setBalance] = useState(50000);

  const handleTry = () => {
    setShowFirstCall(false);
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
                {balance.toLocaleString()}
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

          <button
            className="call-btn"
            onClick={() => {
              setBalance(-10000);
              setShowFundsModal(true);
            }}
          >
            Select a translator and call
          </button>
        </div>
      </div>

      <main className="home-content">
        <h3>Popular translation topics</h3>

        <div className="topic-grid">
          {topics.map(([item, icon]) => (
            <button key={item}>
              <span className="topic-icon">
                <img src={icon} alt={item} />
              </span>
              <b>{item}</b>
            </button>
          ))}
        </div>

        <h3>My recent calls</h3>

        {calls.map(([name, topic, time, img]) => (
          <div className="call-item" key={name}>
            <img className="avatar" src={img} alt={name} />

            <div>
              <b>{name}</b>
              <p>{topic}</p>
            </div>

            <div className="rate">
              ⭐⭐⭐⭐⭐
              <small>{time}</small>
            </div>
          </div>
        ))}
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

            <button onClick={handleTry}>Try</button>
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
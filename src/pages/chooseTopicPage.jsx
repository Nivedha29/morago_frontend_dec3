// src/pages/ChooseTopicPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";

import bankIcon from "../assets/dollar-circle.svg";
import taxiIcon from "../assets/map.svg";
import mailIcon from "../assets/box.svg";
import documentIcon from "../assets/sms-tracking.svg";
import financeIcon from "../assets/wallet-2.svg";
import othersIcon from "../assets/category.svg";

import caller1 from "../assets/Caller Image.svg";
import caller2 from "../assets/Caller Image (1).svg";
import caller3 from "../assets/Caller Image (2).svg";

const topics = [
  ["Bank", bankIcon],
  ["Taxi", taxiIcon],
  ["Mail", mailIcon],
  ["Documents", documentIcon],
  ["Finances", financeIcon],
  ["Others", othersIcon],
];

const translators = [
  {
    name: "Ms. Diana",
    topic: "Bank",
    language: "Bank, English, Taal",
    rating: "4.9",
    reviews: "7",
    image: caller1,
    status: "online",
  },
  {
    name: "Ms. Natalia",
    topic: "Bank",
    language: "Bank, English, Taal",
    rating: "4.8",
    reviews: "34",
    image: caller2,
    status: "offline",
  },
  {
    name: "Mr. Min Ho",
    topic: "Bank",
    language: "Bank, English, Taal",
    rating: "4.9",
    reviews: "67",
    image: caller3,
    status: "online",
  },
];

export default function ChooseTopicPage() {
  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTranslators, setShowTranslators] = useState(false);
  const [selectedTranslator, setSelectedTranslator] = useState(null);
  const [calling, setCalling] = useState(false);

  const handleNext = () => {
    if (!selectedTopic) return;
    setShowTranslators(true);
  };

  const handleCall = () => {
    if (!selectedTranslator || selectedTranslator.status === "offline") return;

    setCalling(true);

    setTimeout(() => {
      setCalling(false);
      navigate("/call", {
        state: {
          translator: selectedTranslator,
          topic: selectedTopic,
        },
      });
    }, 700);
  };

  return (
    <div className="phone-wrap">
      <div className="screen choose-page">
        <StatusBar />

        <header className="choose-header">
          <button
            onClick={() =>
              showTranslators ? setShowTranslators(false) : navigate(-1)
            }
          >
            ←
          </button>
          <b>morago</b>
          <span />
        </header>

        {!showTranslators ? (
          <main className="choose-body">
            <div className="choose-search">
              <span>⌕</span>
              <input placeholder="Search Topic" />
            </div>

            <h3>Services &lt;</h3>

            <div className="choose-grid">
              {topics.map(([name, icon]) => (
                <button
                  key={name}
                  className={selectedTopic?.name === name ? "active" : ""}
                  onClick={() => setSelectedTopic({ name, icon })}
                >
                  <img src={icon} alt={name} />
                  <b>{name}</b>
                </button>
              ))}
            </div>

            <div className="service-list">
              <button>Migration &lt;</button>
              <button>Work &lt;</button>
              <button>Government Agencies &lt;</button>
              <button>Leisure &lt;</button>
            </div>

            <button
              className="next-btn"
              disabled={!selectedTopic}
              onClick={handleNext}
            >
              Next
            </button>
          </main>
        ) : (
          <main className="choose-body">
            <h3>Selected Topic</h3>

            <div className="selected-topic">
              <img src={selectedTopic.icon} alt={selectedTopic.name} />
              <p>{selectedTopic.name}</p>
            </div>

            <h3>Available Translators</h3>

            <div className="translator-list">
              {translators.map((translator) => (
                <button
                  key={translator.name}
                  className="translator-card"
                  onClick={() => setSelectedTranslator(translator)}
                >
                  <img src={translator.image} alt={translator.name} />

                  <div>
                    <b>{translator.name}</b>
                    <p>{translator.topic}</p>
                  </div>

                  <span>
                    ⭐⭐⭐⭐⭐ <small>({translator.reviews})</small>
                  </span>
                </button>
              ))}
            </div>
          </main>
        )}

        <nav className="bottom-nav">
          {["Home", "My calls", "Message", "Profile"].map((item, i) => (
            <button key={item} className={i === 0 ? "active" : ""}>
              <span>{["⌂", "☏", "▢", "♙"][i]}</span>
              {item}
            </button>
          ))}
        </nav>

        {selectedTranslator && (
          <div className="translator-popup">
            <div
              className="popup-dark"
              onClick={() => setSelectedTranslator(null)}
            />

            <div className="popup-sheet">
              <div className="popup-title">
                <span
                  className={
                    selectedTranslator.status === "online"
                      ? "dot green"
                      : "dot red"
                  }
                />
                <div>
                  <b>Translator Diana</b>
                  <p>{selectedTranslator.language}</p>
                </div>
              </div>

              <div className="popup-user">
                <img
                  src={selectedTranslator.image}
                  alt={selectedTranslator.name}
                />

                <div>
                  <b>{selectedTranslator.name}</b>
                  <p>⭐ {selectedTranslator.rating}</p>
                </div>

                <button>📞</button>
                <button>💬</button>
              </div>

              <div className="popup-info">
                <div>
                  <b
                    className={
                      selectedTranslator.status === "online"
                        ? "green-text"
                        : "red-text"
                    }
                  >
                    {selectedTranslator.status === "online"
                      ? "Online"
                      : "Offline"}
                  </b>
                  <p>Availability</p>
                </div>

                <div>
                  <b>Verified</b>
                  <p>Status</p>
                </div>

                <div>
                  <b>1000 coins</b>
                  <p>1 minute</p>
                </div>
              </div>

              <button
                className={
                  selectedTranslator.status === "online"
                    ? "popup-call"
                    : "popup-call disabled"
                }
                disabled={selectedTranslator.status === "offline"}
                onClick={handleCall}
              >
                {selectedTranslator.status === "online"
                  ? "Call"
                  : "Not Available"}
              </button>
            </div>
          </div>
        )}

        {calling && (
          <div className="calling-loader">
            <div />
          </div>
        )}

        <div className="home-indicator" />
      </div>
    </div>
  );
}
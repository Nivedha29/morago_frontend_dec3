import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatusBar from "../components/StatusBar.jsx";
import api from "../services/api";
import "./ChooseTopicPage.css";


export default function ChooseTopicPage() {
  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTranslators, setShowTranslators] = useState(false);
  const [selectedTranslator, setSelectedTranslator] = useState(null);
  const [calling, setCalling] = useState(false);

  const [translators, setTranslators] = useState([]);
  const [loadingTranslators, setLoadingTranslators] = useState(false);
  const [translatorError, setTranslatorError] = useState("");

  useEffect(() => {
    if (!showTranslators) return;

    const fetchTranslators = async () => {
      try {
        setLoadingTranslators(true);
        setTranslatorError("");

        const response = await api.get("/admin/translators", {
          params: {
            isActive: true,
            hasWithdrawal: false,
            page: 0,
            size: 20,
            sortDirection: "ASC",
          },
        });

        setTranslators(response.data?.content || []);
      } catch (error) {
        console.error("Failed to fetch translators:", error);
        setTranslatorError("Failed to load translators.");
      } finally {
        setLoadingTranslators(false);
      }
    };

    fetchTranslators();
  }, [showTranslators]);

  const getTranslatorName = (translator) => {
    return `${translator.firstName || ""} ${translator.lastName || ""}`.trim();
  };

  const getTranslatorLanguage = (translator) => {
    return translator.languages?.[0]?.name || "No language";
  };

  const getTranslatorTheme = (translator) => {
    return translator.themes?.[0]?.titleEn || selectedTopic?.name || "General";
  };

  const getTranslatorStatus = (translator) => {
    return translator.isOnline ? "online" : "offline";
  };

  const handleNext = () => {
    if (!selectedTopic) return;
    setShowTranslators(true);
  };

  const handleCall = () => {
    if (!selectedTranslator || !selectedTranslator.isOnline) return;

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

            {loadingTranslators && <p>Loading translators...</p>}

            {translatorError && <p className="error-text">{translatorError}</p>}

            {!loadingTranslators && !translatorError && (
              <div className="translator-list">
                {translators.map((translator) => (
                  <button
                    key={translator.id}
                    className="translator-card"
                    onClick={() => setSelectedTranslator(translator)}
                  >
                    <div className="translator-avatar">
                      {getTranslatorName(translator).charAt(0) || "T"}
                    </div>

                    <div>
                      <b>{getTranslatorName(translator) || "Translator"}</b>
                      <p>{getTranslatorTheme(translator)}</p>
                    </div>

                    <span>
                      ⭐ {translator.averageRating || 0}
                      <small> ({translator.completedCalls || 0})</small>
                    </span>
                  </button>
                ))}
              </div>
            )}
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
                    getTranslatorStatus(selectedTranslator) === "online"
                      ? "dot green"
                      : "dot red"
                  }
                />

                <div>
                  <b>{getTranslatorName(selectedTranslator) || "Translator"}</b>
                  <p>{getTranslatorLanguage(selectedTranslator)}</p>
                </div>
              </div>

              <div className="popup-user">
                <div className="popup-avatar">
                  {getTranslatorName(selectedTranslator).charAt(0) || "T"}
                </div>

                <div>
                  <b>{getTranslatorName(selectedTranslator) || "Translator"}</b>
                  <p>⭐ {selectedTranslator.averageRating || 0}</p>
                </div>

                <button>📞</button>
                <button>💬</button>
              </div>

              <div className="popup-info">
                <div>
                  <b
                    className={
                      getTranslatorStatus(selectedTranslator) === "online"
                        ? "green-text"
                        : "red-text"
                    }
                  >
                    {getTranslatorStatus(selectedTranslator) === "online"
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
                  getTranslatorStatus(selectedTranslator) === "online"
                    ? "popup-call"
                    : "popup-call disabled"
                }
                disabled={getTranslatorStatus(selectedTranslator) === "offline"}
                onClick={handleCall}
              >
                {getTranslatorStatus(selectedTranslator) === "online"
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

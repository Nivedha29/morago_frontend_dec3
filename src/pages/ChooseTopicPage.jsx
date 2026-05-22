import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import StatusBar from "../components/StatusBar.jsx";
import "./ChooseTopicPage.css";

export default function ChooseTopicPage() {
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [topicError, setTopicError] = useState("");
  const [topicSearch, setTopicSearch] = useState("");

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTranslators, setShowTranslators] = useState(false);

  const [translators, setTranslators] = useState([]);
  const [selectedTranslator, setSelectedTranslator] = useState(null);
  const [loadingTranslators, setLoadingTranslators] = useState(false);
  const [translatorError, setTranslatorError] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoadingTopics(true);
        setTopicError("");

        const response = await api.get("/profile/categories", {
          params: {
            categoryPageRequest: JSON.stringify({
              page: 0,
              size: 20,
              sortBy: "id",
              sortDirection: "ASC",
              isActive: true,
              keyword: "",
            }),
          },
        });

        setTopics(response.data?.content || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setTopicError(error.message || "Failed to load categories.");
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    if (!showTranslators || !selectedTopic) return;

    const fetchTranslators = async () => {
      try {
        setLoadingTranslators(true);
        setTranslatorError("");

        const response = await api.get("/user/translators", {
  params: {
    themeId: selectedTopic.id,
    page: 0,
    size: 20,
    sortBy: "id",
    sortDirection: "ASC",
  },
});

        setTranslators(response.data?.content || []);
      } catch (error) {
        console.error("Failed to fetch translators:", error);
        setTranslatorError(error.message || "Failed to load translators.");
      } finally {
        setLoadingTranslators(false);
      }
    };

    fetchTranslators();
  }, [showTranslators, selectedTopic]);

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) =>
      topic.name?.toLowerCase().includes(topicSearch.toLowerCase()),
    );
  }, [topics, topicSearch]);

  const getTranslatorName = (translator) => {
  const fullName = [
    translator.firstName || translator.firstname || translator.user?.firstName,
    translator.lastName || translator.lastname || translator.user?.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const displayName =
    fullName ||
    translator.fullName ||
    translator.user?.fullName ||
    translator.name ||
    translator.user?.name;

  return displayName && displayName !== "Translator"
    ? displayName
    : `Translator #${translator.id || translator.translatorId || ""}`.trim();
};

  const getTranslatorImage = (translator) => {
    return translator.image || translator.avatar || translator.avatarUrl || "";
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setShowTranslators(true);
  };

  const handleBack = () => {
    if (showTranslators) {
      setShowTranslators(false);
      setSelectedTranslator(null);
      return;
    }

    navigate(-1);
  };

  const handleStartCall = () => {
    if (!selectedTranslator || !selectedTopic) return;

    navigate("/call", {
      state: {
        translator: {
          ...selectedTranslator,
          id: selectedTranslator.id || selectedTranslator.translatorId,
          name: getTranslatorName(selectedTranslator),
          image: getTranslatorImage(selectedTranslator),
        },
        topic: {
          ...selectedTopic,
          id: selectedTopic.id || selectedTopic.themeId,
          name: selectedTopic.name || selectedTopic.titleEn || selectedTopic.title,
        },
      },
    });
  };

  return (
    <div className="phone-wrap">
      <div className="screen choose-page">
        <StatusBar />

        <header className="choose-header">
          <button onClick={handleBack}>←</button>
          <b>morago</b>
          <span />
        </header>

        {!showTranslators ? (
          <main className="choose-body">
            <div className="choose-search">
              <span>⌕</span>
              <input
                placeholder="Search Topic"
                value={topicSearch}
                onChange={(event) => setTopicSearch(event.target.value)}
              />
            </div>

            <h3>Choose topic</h3>

            {loadingTopics && <p>Loading categories...</p>}

            {topicError && <p className="error-text">{topicError}</p>}

            {!loadingTopics && !topicError && (
              <div className="choose-grid">
                {filteredTopics.map((topic) => (
                  <button
                    key={topic.id}
                    className={selectedTopic?.id === topic.id ? "active" : ""}
                    onClick={() => handleSelectTopic(topic)}
                  >
                    <span>{topic.name?.charAt(0) || "T"}</span>
                    <b>{topic.name}</b>
                  </button>
                ))}
              </div>
            )}

            {!loadingTopics && !topicError && filteredTopics.length === 0 && (
              <p>No topics found.</p>
            )}
          </main>
        ) : (
          <main className="choose-body">
            <h3>Selected Topic</h3>

            <div className="selected-topic">
              <span>{selectedTopic?.name?.charAt(0) || "T"}</span>
              <p>{selectedTopic?.name}</p>
            </div>

            <h3>Choose translator</h3>

            {loadingTranslators && <p>Loading translators...</p>}

            {translatorError && <p className="error-text">{translatorError}</p>}

            {!loadingTranslators && !translatorError && (
              <div className="translator-list">
                {translators.map((translator) => {
                  const isSelected = selectedTranslator?.id === translator.id;

                  return (
                    <button
                      key={translator.id}
                      className={`translator-card ${isSelected ? "active" : ""}`}
                      onClick={() => setSelectedTranslator(translator)}
                    >
                      <div className="translator-avatar">
                        {getTranslatorImage(translator) ? (
                          <img
                            src={getTranslatorImage(translator)}
                            alt={getTranslatorName(translator)}
                          />
                        ) : (
                          <span>{getTranslatorName(translator).charAt(0)}</span>
                        )}
                      </div>

                      <div className="translator-info">
                        <b>{getTranslatorName(translator)}</b>
                        <p>
                          {translator.languages?.[0]?.name ||
                            translator.language ||
                            "Available translator"}
                        </p>
                      </div>

                      <span className="translator-rating">
                        ⭐ {translator.averageRating || 0}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {!loadingTranslators &&
              !translatorError &&
              translators.length === 0 && <p>No translators available.</p>}

            <button
              className="start-call-btn"
              disabled={!selectedTranslator}
              onClick={handleStartCall}
            >
              Start Call
            </button>
          </main>
        )}

        <nav className="bottom-nav">
          <button onClick={() => navigate("/home")} className="active">
            <span>⌂</span>
            Home
          </button>

          <button type="button" onClick={() => navigate("/my-calls")}>
            <span>☏</span>
            My calls
          </button>

          <button type="button">
            <span>▢</span>
            Message
          </button>

          <button type="button">
            <span>♙</span>
            Profile
          </button>
        </nav>

        <div className="home-indicator" />
      </div>
    </div>
  );
}